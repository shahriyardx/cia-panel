import { env } from "@/env"
import fetch from "isomorphic-unfetch"
import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { guildId } = req.query

	const response = await fetch(
		`https://discord.com/api/v10/guilds/${guildId}/channels`,
		{
			headers: {
				Authorization: `Bot ${env.DISCORD_TOKEN}`,
				"User-Agent": "SlashCommands (https://ccbot.app, 1.0)",
			},
		},
	)

	const data = (await response.json()) as {
		type: number
		name: string
		id: string
	}[]
	const tc = data.filter((c) => c.type === 0)

	res.json(tc)
}

export default handler
