import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { TRPCError } from "@trpc/server"

export const messageRouter = createTRPCRouter({
	sendMessage: protectedProcedure.mutation(async ({ ctx }) => {
		const registrationData = await ctx.db.userInfo.findFirst({
			where: {
				discordId: ctx.session.user.id,
			},
		})

		if (!registrationData) {
			throw new TRPCError({
				code: "FORBIDDEN",
				message:
					"Please finish registration first and then verify your console",
			})
		}
	}),
})
