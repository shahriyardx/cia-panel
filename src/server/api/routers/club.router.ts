import { z } from "zod"

import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from "@/server/api/trpc"
import { clubSchema } from "@/server/schema/club.schema"
import { TRPCError } from "@trpc/server"
export const clubRouter = createTRPCRouter({
	createClub: adminProcedure
		.input(clubSchema)
		.mutation(async ({ ctx, input }) => {
			const existing = await ctx.db.club.findFirst({
				where: {
					clubId: input.clubId,
				},
			})

			if (existing) {
				await ctx.db.club.updateMany({
					where: {
						clubId: input.clubId,
					},
					data: input,
				})

				return { message: "club updated" }
			}

			const response = await fetch(
				`https://proclubs.ea.com/api/nhl/clubs/info?platform=common-gen5&clubIds=${input.clubId}`,
			)

			if (response.status !== 200) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `unable to find club with id ${input.clubId}`,
				})
			}

			await ctx.db.club.create({ data: input })
			return { message: "club created" }
		}),
	clubs: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.club.findMany()
	}),
	deleteClub: adminProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.club.delete({
				where: {
					id: input.id,
				},
			})
		}),
})
