import { z } from "zod"

import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from "@/server/api/trpc"
import { clubSchema } from "@/server/schema/club.schema"
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
