import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { env } from "@/env"
import { TRPCError } from "@trpc/server"

export const verificationRouter = createTRPCRouter({
	shorten: protectedProcedure
		.input(
			z.object({
				url: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const api_url = "https://i8.ae/api/url/add"

			const response = await fetch(api_url, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${env.I8_API}`,
				},
				body: JSON.stringify({
					url: input.url,
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
		}),
})
