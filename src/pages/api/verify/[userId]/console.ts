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
		},
	})

	res.json({ success: true })
}
