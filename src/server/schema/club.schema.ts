import { z } from "zod"

export const clubSchema = z.object({
	clubId: z.string().min(1),
	name: z.string().min(1),
	image: z.string().min(1),
})
