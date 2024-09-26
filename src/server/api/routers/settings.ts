import { z } from "zod"

import { adminProcedure, createTRPCRouter } from "@/server/api/trpc"
import { credentialsSchema } from "@/components/forms/credentials-form"

export const settingsRouter = createTRPCRouter({
	getSettings: adminProcedure.query(async ({ ctx }) => {
		const existing = await ctx.db.settings.findFirst()
		if (!existing) {
			return await ctx.db.settings.create({
				data: {
					xapi: "",
					npsso: "",
				},
			})
		}

		return existing
	}),
	saveCredentials: adminProcedure
		.input(credentialsSchema)
		.mutation(async ({ ctx, input }) => {
			const existing = await ctx.db.settings.findFirst()
			if (!existing) {
				return await ctx.db.settings.create({ data: input })
			}
			return await ctx.db.settings.update({
				where: { id: existing.id },
				data: input,
			})
		}),
})
