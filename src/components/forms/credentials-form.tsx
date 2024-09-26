import React from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const credentialsSchema = z.object({
	npsso: z.string().min(1),
	xapi: z.string().min(1),
})

export type CredentialsType = z.infer<typeof credentialsSchema>

type Props = {
	form: UseFormReturn<CredentialsType>
	onSubmit: (values: CredentialsType) => void
}

const CredentialsForm = ({ form, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="npsso"
					render={({ field }) => (
						<FormItem>
							<FormLabel>NPSSO</FormLabel>
							<FormControl>
								<Input placeholder="Enter NPSSO here" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="xapi"
					render={({ field }) => (
						<FormItem>
							<FormLabel>XAPI Key</FormLabel>
							<FormControl>
								<Input placeholder="Enter XAPI Key here" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div>
					<Button type="submit">Save</Button>
				</div>
			</form>
		</Form>
	)
}

export default CredentialsForm
