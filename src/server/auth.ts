import { type GetServerSidePropsContext } from "next"
import {
	getServerSession,
	type DefaultSession,
	type NextAuthOptions,
	type User,
} from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

import { env } from "@/env"
import { DefaultJWT, JWT } from "next-auth/jwt"
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
		connections: Connection
		token: JWT
		is_admin: boolean
		ip?: string
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
		is_admin: boolean
		access_token: string
		refresh_token: string
		expires_at: number
		connections: Connection
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

type Connection = {
	ps?: string
	xbox?: string
	ea?: string
}

export const refresh_discord_token = async (token: string) => {
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

export const fetchConnections = async (token: string) => {
	const response = await fetch(
		"https://discord.com/api/users/@me/connections",
		{
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	)
	const data = (await response.json()) as DiscordConnection[]
	const ps_connection = data.find((con) => con.type === "playstation")
	const xbox_connection = data.find((con) => con.type === "xbox")
	const ea_connection = data.find((con) => con.type === "ea")

	const connections = {
		ps: ps_connection?.name,
		xbox: xbox_connection?.name,
		ea: ea_connection?.name,
	}

	return { connections, data }
}
