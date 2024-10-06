import { db } from "@/server/db"
import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
	success: boolean
	ip?: string
	agent?: string
	full_agent?: string
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
		return res.json({ success: false })
	}

	const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress

	await db.userInfo.update({
		where: {
			id: data.id,
		},
		data: {
			user_ip: ip as string,
		},
	})

	res.json({ success: true })
}
