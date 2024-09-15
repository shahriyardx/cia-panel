import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { signUpSchema } from "@/server/schema/sign-up"
import { TRPCError } from "@trpc/server"

export const verificationRouter = createTRPCRouter({
	verify: protectedProcedure
		.input(signUpSchema)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id

			const user = await ctx.db.user.findFirst({
				where: {
					discordId: userId,
				},
			})

			if (!user) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "unable to register, please logout and relogin",
				})
			}

			const data = await ctx.db.userInfo.findFirst({
				where: {
					discordId: userId,
				},
			})

			if (data) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "you are already registered",
				})
			}

			if (!data) {
				await ctx.db.userInfo.create({
					data: {
						birthday: input.birthday,
						city: input.city,
						discordId: userId,
						userId: user?.id as string,
						gender: input.gender,
						jerseyNumber: input.jerseyNumber,
						primaryConsole: input.primaryConsole,
						primaryPosition: input.primaryPosition,
						secondaryPosition: input.secondaryPosition,
						shootingHand: input.shootingHand,
						eaId: input.eaId,
						gamertag: input.gamertag,
						phone: input.phone,
						psn: input.psn,
					},
				})
			}
		}),
})
