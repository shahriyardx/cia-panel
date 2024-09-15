import { z } from "zod"

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc"
import { fetchConnections } from "@/server/auth"

export const authRouter = createTRPCRouter({
	getConnections: protectedProcedure.mutation(async ({ ctx }) => {
		const token = ctx.session.token.access_token
		const { connections } = await fetchConnections(token)

		return connections
	}),
})
