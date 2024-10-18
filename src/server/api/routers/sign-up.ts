import {
	adminProcedure,
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc"
import { signUpSchema } from "@/server/schema/sign-up.schema"
import { TRPCError } from "@trpc/server"
import { env } from "@/env"
import type { Settings } from "@prisma/client"
import { z } from "zod"

type AccountFindInfo = {
	provider: "xbox" | "playstation"
	username: string
	settings: Settings
}

type ConsoleAccount = {
	account_id: string
	username: string
}

type AccountResponse =
	| {
			success: true
			data: ConsoleAccount
	  }
	| {
			success: false
			data: null
			error: string
	  }

const getAccountInfo = async ({
	provider,
	username,
	settings,
}: AccountFindInfo) => {
	let token = ""
	if (provider === "playstation") token = settings.npsso
	if (provider === "xbox") token = settings.xapi

	const response = await fetch(
		`${env.ACCOUNT_SERVICES_API}/${provider}/profile/${username}/`,
		{
			headers: {
				Authorization: token,
			},
		},
	)

	const data = (await response.json()) as AccountResponse
	return data
}

export const signUpRouter = createTRPCRouter({
	allSubmissions: adminProcedure.query(async ({ ctx }) => {
		const data = await ctx.db.userInfo.findMany({
			include: {
				user: {
					select: {
						name: true,
						image: true,
					},
				},
			},
		})
		return data || []
	}),
	submissionById: adminProcedure
		.input(
			z.object({
				uid: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const data = await ctx.db.userInfo.findFirst({
				where: {
					id: input.uid,
				},
				include: {
					user: {
						include: {
							Logins: {
								orderBy: {
									time: "desc",
								},
								take: 5,
							},
						},
					},
				},
			})
			return data
		}),
	info: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session.user.id

		const user = await ctx.db.userInfo.findFirst({
			where: {
				discordId: userId,
			},
		})

		return user
	}),
	infoByUserId: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const user = await ctx.db.userInfo.findFirst({
				where: {
					id: input.userId,
				},
			})

			return user
		}),
	signUp: protectedProcedure
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

			const console_name =
				input.primaryConsole === "playstation" ? input.psn : input.gamertag
			const blazeResponse = await fetch(
				`https://proclubs.ea.com/api/nhl/members/search?platform=common-gen5&memberName=${console_name}`,
			)
			const blazeData = (await blazeResponse.json()) as {
				members: { blazeId: string; name: string }[]
			}

			const actual = blazeData.members.find(
				(member) => member.name === console_name,
			)

			if (!actual) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message:
						"Unable to find your EA Player ID, Please create a player in World of Chel that you use in PIN Games.",
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

			const settings = await ctx.db.settings.findFirst()

			if (!settings) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Something went wrong please try again",
				})
			}

			const accountInfo = await getAccountInfo({
				provider: input.primaryConsole,
				username:
					input.primaryConsole === "playstation"
						? (input.psn as string)
						: (input.gamertag as string),
				settings: settings,
			})

			if (!accountInfo.success) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: accountInfo.error,
				})
			}

			const console_data = {
				psn_account_id: "",
				xbox_account_id: "",
			}

			if (input.primaryConsole === "playstation") {
				console_data.psn_account_id = accountInfo.data.account_id
			}

			if (input.primaryConsole === "xbox") {
				console_data.xbox_account_id = accountInfo.data.account_id
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
						console_verified: false,
						blazeId: actual.blazeId,
						seasonId: settings.seasonId as string,
						...console_data,
					},
				})
			}
		}),
})
