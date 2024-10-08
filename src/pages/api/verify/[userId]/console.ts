import { env } from "@/env"
import { db } from "@/server/db"
import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
	success: boolean
	error?: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
) {
	const { userId } = req.query as { userId: string }

	const data = await db.userInfo.findFirst({
		where: {
			id: userId,
		},
	})

	if (!data) {
		return { success: false, error: "userinfo not found" }
	}

	const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress
	const useragent = req.headers["user-agent"]

	if (!useragent) {
		return res.json({ success: false })
	}
	const idx1 = useragent.indexOf("(")
	const idx2 = useragent.indexOf(")")
	const agent = useragent.substring(idx1 + 1, idx2)
	const asmall = agent.toLowerCase()

	if (data.primaryConsole === "playstation") {
		if (!asmall.includes("playstation")) {
			return res.json({
				success: false,
				error: "you are not using a playstation",
			})
		}
	}

	if (data.primaryConsole === "xbox") {
		if (!asmall.includes("windows") || asmall.includes("playstation")) {
			return res.json({
				success: false,
				error: "you are not using a xbox",
			})
		}
	}

	await db.userInfo.update({
		where: {
			id: data.id,
		},
		data: {
			console_ip: ip as string,
			console_agent: agent,
			console_verified: true,
		},
	})
	const settings = await db.settings.findFirst()
	const config = await db.roles.findFirst()

	if (!config || !settings) return res.json({ success: true })

	const roles_to_add = []
	const roles_to_remove = []
	if (data.primaryConsole === "playstation") {
		roles_to_add.push(config.playstation)
	} else {
		roles_to_add.push(config.xbox)
	}

	roles_to_add.push(config[data.primaryPosition])
	roles_to_add.push(config[data.secondaryPosition])

	roles_to_add.push(...config.signup_add_roles)
	roles_to_remove.push(...config.signup_remove_roles)

	roles_to_add.forEach(async (role) => {
		await fetch(
			`https://discord.com/api/v10/guilds/${settings.support_server}/members/${data.discordId}/roles/${role}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bot ${env.DISCORD_TOKEN}`,
					"Content-Type": "application/json",
				},
			},
		)
	})

	roles_to_remove.forEach(async (role) => {
		await fetch(
			`https://discord.com/api/v10/guilds/${settings.support_server}/members/${data.discordId}/roles/${role}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bot ${env.DISCORD_TOKEN}`,
					"Content-Type": "application/json",
				},
			},
		)
	})

	await fetch(
		`https://discord.com/api/v10/guilds/${settings.support_server}/members/${data.discordId}`,
		{
			method: "PATCH",
			headers: {
				Authorization: `Bot ${env.DISCORD_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nick: data.gamertag || data.psn,
			}),
		},
	)

	res.json({ success: true })
}
