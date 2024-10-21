import { z } from "zod"

import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from "@/server/api/trpc"
import { TRPCError } from "@trpc/server"
import { seasonSchema } from "@/pages/admin/seasons"

export const seasonRouter = createTRPCRouter({
	createSeason: adminProcedure
		.input(seasonSchema)
		.mutation(async ({ ctx, input }) => {
			const season = await ctx.db.season.findFirst({
				where: {
					name: input.name,
				},
			})

			if (season) {
				throw new TRPCError({
					code: "CONFLICT",
					message: `${input.name} already exists`,
				})
			}

			const newSeason = await ctx.db.season.create({
				data: {
					name: input.name,
					playOff: input.playOff,
				},
			})

			if (input.default) {
				await ctx.db.settings.updateMany({
					data: {
						seasonId: newSeason.id,
					},
				})

				const clubs = await ctx.db.club.findMany()
				clubs.forEach(async (club) => {
					await ctx.db.clubSeasonalStats.create({
						data: {
							clubId: club.id,
							seasonId: newSeason.id,
						},
					})
				})
			}
		}),
	seasons: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.season.findMany()
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
