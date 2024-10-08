import {
	NextApiRequest,
	NextApiResponse,
	type GetServerSidePropsContext,
} from "next"
import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

import { env } from "@/env"
import { db } from "@/server/db"
import { fetchConnections, refresh_discord_token } from "@/server/auth"

type AuthOptionsProps = {
	ip?: string
}

export const authOptions = ({ ip }: AuthOptionsProps) => {
	return {
		callbacks: {
			session: ({ session, token }) => {
				return {
					...session,
					user: token.user,
					connections: token.connections,
					token: token,
					is_admin: token.is_admin,
					ip: ip,
					is_in_discord: token.is_in_discord,
				}
			},

			jwt: async ({ token, user, account, trigger }) => {
				if (user && account) {
					token.user = user
					token.access_token = account.access_token as string
					token.refresh_token = account.refresh_token as string
					token.expires_at = (account.expires_at as number) * 1000

					const settings = await db.settings.findFirst()

					const response = await fetch(
						`https://discord.com/api/users/@me/guilds`,
						{
							headers: {
								Authorization: `Bearer ${account.access_token}`,
								"User-Agent": "SlashCommands (https://ccbot.app, 1.0)",
							},
						},
					)

					const data = (await response.json()) as { id: string }[]

					const is_in_discord = data.find(
						(guild) => guild.id === settings?.support_server,
					)

					token.is_in_discord = !!is_in_discord

					if (["810256917497905192", "696939596667158579"].includes(user.id)) {
						token.is_admin = true
					}

					const { connections } = await fetchConnections(
						account.access_token as string,
					)
					let existingUser = await db.user.findUnique({
						where: {
							discordId: user.id,
						},
					})

					if (!existingUser) {
						existingUser = await db.user.create({
							data: {
								discordId: user.id,
								name: user.name as string,
								email: user.email as string,
								image: user.image,
							},
						})
					}

					await db.logins.create({
						data: {
							userId: existingUser.id,
							ip: ip as string,
							time: new Date(),
						},
					})

					token.connections = connections
					return token
				}

				if (trigger === "update") {
					const { connections } = await fetchConnections(
						token.access_token as string,
					)
					token.connections = connections
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
				authorization: {
					params: {
						scope: "identify connections email guilds",
					},
				},
			}),
		],
	} as NextAuthOptions
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const ip =
		req.headers["x-forwarded-for"] ||
		req.headers["x-real-ip"] ||
		req.socket.remoteAddress
	return await NextAuth(req, res, authOptions({ ip: ip as string }))
}

export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"]
	res: GetServerSidePropsContext["res"]
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions({}))
}
