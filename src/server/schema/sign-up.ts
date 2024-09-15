import { z } from "zod"

export const signUpSchemaClient = z.object({
	primaryConsole: z.enum(["playstation", "xbox", "both"], {
		message: "please select primary console",
	}),
	psn: z.string().optional(),
	gamertag: z.string().optional(),
	eaId: z.string().optional(),
	birthday: z.date({ message: "please select your birthday" }),
	gender: z.enum(["male", "female", "unknown"]),
	jerseyNumber: z.coerce
		.number({
			required_error: "jersey number is required",
			invalid_type_error: "please enter a valid number",
		})
		.int()
		.min(0, { message: "jersey number cant't be less than 0" })
		.max(99, { message: "jersey number cant't be more than 99" }),
	primaryPosition: z.enum(
		[
			"left_wing",
			"right_wing",
			"left_defense",
			"right_defense",
			"center",
			"goalie",
		],
		{ message: "please select a position" },
	),
	secondaryPosition: z.enum(
		[
			"left_wing",
			"right_wing",
			"left_defense",
			"right_defense",
			"center",
			"goalie",
		],
		{ message: "please select a position" },
	),
	city: z.string({ message: "please enter your city and state" }),
	shootingHand: z.enum(["left", "right"], {
		message: "please select shooting hand",
	}),
	phone: z
		.string()
		.regex(
			/^(?:\+1)?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
			"invalid phone number",
		)
		.optional(),
})

export type SignUpClient = z.infer<typeof signUpSchemaClient>

export const signUpSchema = z
	.object({
		primaryConsole: z.enum(["playstation", "xbox", "both"], {
			message: "please select primary console",
		}),
		psn: z.string().optional(),
		gamertag: z.string().optional(),
		eaId: z.string().optional(),
		birthday: z.date({ message: "please select your birthday" }),
		gender: z.enum(["male", "female", "unknown"]),
		jerseyNumber: z.coerce
			.number({
				required_error: "jersey number is required",
				invalid_type_error: "please enter a valid number",
			})
			.int()
			.min(0, { message: "jersey number cant't be less than 0" })
			.max(99, { message: "jersey number cant't be more than 99" }),
		primaryPosition: z.enum(
			[
				"left_wing",
				"right_wing",
				"left_defense",
				"right_defense",
				"center",
				"goalie",
			],
			{ message: "please select a position" },
		),
		secondaryPosition: z.enum(
			[
				"left_wing",
				"right_wing",
				"left_defense",
				"right_defense",
				"center",
				"goalie",
			],
			{ message: "please select a position" },
		),
		city: z.string({ message: "please enter your city and state" }),
		shootingHand: z.enum(["left", "right"], {
			message: "please select shooting hand",
		}),
		phone: z
			.string()
			.regex(
				/^(?:\+1)?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
				"invalid phone number",
			)
			.optional(),
	})
	.superRefine(({ primaryConsole, psn, gamertag }, rc) => {
		if (primaryConsole === "playstation" && !psn) {
			return rc.addIssue({
				code: z.ZodIssueCode.custom,
				message: "psn is required",
				path: ["psn"],
			})
		}

		if (primaryConsole === "xbox" && !gamertag) {
			return rc.addIssue({
				code: z.ZodIssueCode.custom,
				message: "gamertag is required",
				path: ["gamertag"],
			})
		}

		if (primaryConsole === "both" && (!psn || !gamertag)) {
			return rc.addIssue({
				code: z.ZodIssueCode.custom,
				message: "psn and gamertag both is required",
				path: [!psn ? "psn" : "gamertag"],
			})
		}
	})

export type SignUp = z.infer<typeof signUpSchema>
