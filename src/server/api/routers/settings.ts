import { adminProcedure, createTRPCRouter } from "@/server/api/trpc"
import { credentialsSchema } from "@/components/forms/credentials-form"
import { roleSettingsSchema } from "@/pages/admin/settings/roles"
import { settingSchema } from "@/pages/admin/settings"

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
	getRoleConfig: adminProcedure.query(async ({ ctx }) => {
		const existing = await ctx.db.roles.findFirst()
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
	saveSettings: adminProcedure
		.input(settingSchema)
		.mutation(async ({ ctx, input }) => {
			const existing = await ctx.db.settings.findFirst()
			if (!existing) {
				return await ctx.db.settings.create({
					data: { ...input, npsso: "", xapi: "" },
				})
			}

			return await ctx.db.settings.update({
				where: { id: existing.id },
				data: input,
			})
		}),
	saveRoleConfig: adminProcedure
		.input(roleSettingsSchema)
		.mutation(async ({ ctx, input }) => {
			const existing = await ctx.db.roles.findFirst()
			const normalizedData = {
				...input.position_roles,
				...input.console_roles,
				signup_add_roles: input.signup_add_roles,
				signup_remove_roles: input.signup_remove_roles,
			}

			if (!existing) {
				await ctx.db.roles.create({
					data: normalizedData,
				})
			} else {
				await ctx.db.roles.update({
					where: {
						id: existing.id,
					},
					data: normalizedData,
				})
			}
		}),
})
