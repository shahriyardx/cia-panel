import { type GetServerSidePropsContext } from "next"
import {
	getServerSession,
	type DefaultSession,
	type NextAuthOptions,
	type User,
} from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

import { env } from "@/env"
import { DefaultJWT } from "next-auth/jwt"
import { db } from "./db"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: User
		connections: ConnectionsResponse
	}

	interface User {
		id: string
		email: string
		image: string
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		user: User
		access_token: string
		refresh_token: string
		expires_at: number
		connections: ConnectionsResponse
	}
}

type RefreshResponse = {
	access_token: string
	refresh_token: string
	expires_in: number
}

type DiscordConnection = {
	id: string
	name: string
	type: string
}

type ConnectionsResponse = DiscordConnection[]

const refresh_discord_token = async (token: string) => {
	const tokenUrl = "https://discord.com/api/oauth2/token"

	const body = new URLSearchParams({
		client_id: env.DISCORD_CLIENT_ID,
		client_secret: env.DISCORD_CLIENT_SECRET,
		grant_type: "refresh_token",
		refresh_token: token,
	})

	const response = await fetch(tokenUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: body.toString(),
	})

	const { access_token, refresh_token, expires_in } =
		(await response.json()) as RefreshResponse

	const expires_at = Date.now() + expires_in
	return {
		access_token,
		refresh_token,
		expires_at,
	}
}

const fetchConnections = async (token: string) => {
	const response = await fetch(
		"https://discord.com/api/users/@me/connections",
		{
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	)
	const data = (await response.json()) as ConnectionsResponse
	const ps_connection = data.find((con) => con.type === "playstation")
	const xbox_connection = data.find((con) => con.type === "xbox")

	const connections = {
		psn: ps_connection?.name,
		gamertag: xbox_connection?.name,
	}

	return { connections, data }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	callbacks: {
		session: ({ session, token }) => {
			return {
				...session,
				user: token.user,
				connections: token.connections,
			}
		},
		jwt: async ({ token, user, account }) => {
			if (user && account) {
				token.user = user
				token.access_token = account.access_token as string
				token.refresh_token = account.refresh_token as string
				token.expires_at = (account.expires_at as number) * 1000

				const { connections, data } = await fetchConnections(
					account.access_token as string,
				)
				const existingUser = await db.user.findUnique({
					where: {
						discordId: user.id,
					},
				})

				if (!existingUser) {
					await db.user.create({
						data: {
							discordId: user.id,
							name: user.name as string,
							email: user.email as string,
							image: user.image,
							psn: connections.psn,
							gamertag: connections.gamertag,
						},
					})
				} else {
					await db.user.update({
						where: {
							id: existingUser.id,
						},
						data: {
							psn: connections.psn,
							gamertag: connections.gamertag,
						},
					})
				}

				token.connections = data
				return token
			}

			if (Date.now() > token.expires_at && token.expires_at) {
				const { access_token, refresh_token, expires_at } =
					await refresh_discord_token(token.refresh_token)

				token.access_token = access_token
				token.refresh_token = refresh_token
				token.expires_at = expires_at
			}

			return token
		},
	},
	providers: [
		DiscordProvider({
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
		}),
	],
}

export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"]
	res: GetServerSidePropsContext["res"]
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions)
}
