import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { TRPCError } from "@trpc/server"
import { env } from "@/env"

export const getShortUrl = async (url: string) => {
	const api_url = `${env.URL_SHORT_API}/shorten`

	const response = await fetch(api_url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			url: url,
		}),
	})

	if (response.status !== 200) {
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Something went wrong please try again",
		})
	}

	const data = await response.json()
	console.log(data)
	return `${env.URL_SHORT_API}/${data.text}`
}

export const messageRouter = createTRPCRouter({
	sendMessage: protectedProcedure
		.input(
			z.object({
				url: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const registrationData = await ctx.db.userInfo.findFirst({
				where: {
					discordId: ctx.session.user.id,
				},
			})
			const settings = await ctx.db.settings.findFirst()

			if (!registrationData || !settings) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message:
						"Please finish registration first and then verify your console",
				})
			}

			const username =
				registrationData.primaryConsole === "playstation"
					? registrationData.psn
					: registrationData.gamertag

			const token =
				registrationData.primaryConsole === "playstation"
					? settings.npsso
					: settings.xapi

			const url = await getShortUrl(input.url)

			console.log(
				`${env.ACCOUNT_SERVICES_API}/${registrationData.primaryConsole}/message/${username}/`,
			)
			await fetch(
				`${env.ACCOUNT_SERVICES_API}/${registrationData.primaryConsole}/message/${username}/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					body: JSON.stringify({
						message: `Welcome to CIA.\nClick the link below FROM YOUR CONSOLE to verify your console.\nIf the link cannot be clicked, type the link and send it back to us and then click the link you sent from your console.`,
					}),
				},
			)

			const response = await fetch(
				`${env.ACCOUNT_SERVICES_API}/${registrationData.primaryConsole}/message/${username}/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					body: JSON.stringify({
						message: url,
					}),
				},
			)

			const data = await response.json()

			if (!data.success) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: data.error,
				})
			}
		}),
})
