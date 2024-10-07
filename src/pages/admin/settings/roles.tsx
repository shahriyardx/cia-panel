import AdminDashboard, { PageTitle } from "@/components/layouts/admin-dashboard"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { MultiSelect } from "@/components/ui/multi-select"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useRoles } from "@/hooks/discord-hooks"
import { db } from "@/server/db"
import { api } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const roleSettingsSchema = z.object({
	position_roles: z.object({
		left_wing: z.string(),
		right_wing: z.string(),
		left_defense: z.string(),
		right_defense: z.string(),
		center: z.string(),
		goalie: z.string(),
	}),
	console_roles: z.object({
		playstation: z.string(),
		xbox: z.string(),
	}),
	signup_add_roles: z.array(z.string()).optional().default([]),
	signup_remove_roles: z.array(z.string()),
})

export type RoleSettings = z.infer<typeof roleSettingsSchema>

const RoleSettings = ({ formData }: { formData: RoleSettings }) => {
	const roles = useRoles()
	const { mutate: saveConfig } = api.settings.saveRoleConfig.useMutation({
		onSuccess: () => {
			toast.success("Role config saved")
		},
	})

	const form = useForm<RoleSettings>({
		resolver: zodResolver(roleSettingsSchema),
		defaultValues: formData,
	})

	return (
		<AdminDashboard>
			<PageTitle>
				<h1 className="text-2xl font-bold">Roles</h1>
			</PageTitle>

			<div>
				{roles.length > 0 ? (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit((values) => saveConfig(values))}
							className="space-y-5"
						>
							<div className="grid grid-cols-3 gap-5">
								<FormField
									control={form.control}
									name="position_roles.left_wing"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Left Wing</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select role" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{roles.map((role) => (
														<SelectItem key={role.id} value={role.id}>
															{role.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="position_roles.right_wing"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Right Wing</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select role" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{roles.map((role) => (
														<SelectItem key={role.id} value={role.id}>
															{role.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="position_roles.left_defense"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Left Defence</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select role" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{roles.map((role) => (
														<SelectItem key={role.id} value={role.id}>
															{role.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="position_roles.right_defense"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Right Defence</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select role" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{roles.map((role) => (
														<SelectItem key={role.id} value={role.id}>
															{role.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="position_roles.center"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Center</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select role" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{roles.map((role) => (
														<SelectItem key={role.id} value={role.id}>
															{role.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="position_roles.goalie"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Goalie</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select role" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{roles.map((role) => (
														<SelectItem key={role.id} value={role.id}>
															{role.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-2 gap-5">
								<FormField
									control={form.control}
									name="console_roles.playstation"
									render={({ field }) => (
										<FormItem>
											<FormLabel>PlayStation</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select role" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{roles.map((role) => (
														<SelectItem key={role.id} value={role.id}>
															{role.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="console_roles.xbox"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Xbox Role</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select role" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{roles.map((role) => (
														<SelectItem key={role.id} value={role.id}>
															{role.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-2 gap-5">
								<FormField
									control={form.control}
									name="signup_add_roles"
									render={({ field }) => {
										return (
											<FormItem className="mb-5">
												<FormLabel>Add After Verification Complete</FormLabel>
												<FormControl>
													<MultiSelect
														options={roles.map((role) => ({
															value: role.id,
															label: role.name,
														}))}
														defaultValue={field.value}
														onValueChange={field.onChange}
														placeholder="Select Roles"
														variant="inverted"
														disabled={false}
													/>
												</FormControl>
												<FormMessage />
												<FormDescription>
													These roles will be added to a member after they
													signup and finish console verification
												</FormDescription>
											</FormItem>
										)
									}}
								/>

								<FormField
									control={form.control}
									name="signup_remove_roles"
									render={({ field }) => {
										return (
											<FormItem className="mb-5">
												<FormLabel>
													Remove After Verification Complete
												</FormLabel>
												<FormControl>
													<MultiSelect
														options={roles.map((role) => ({
															value: role.id,
															label: role.name,
														}))}
														defaultValue={field.value}
														onValueChange={field.onChange}
														placeholder="Select Roles"
														variant="inverted"
														disabled={false}
													/>
												</FormControl>
												<FormMessage />
												<FormDescription>
													These roles will be removed from a member after they
													signup and finish console verification
												</FormDescription>
											</FormItem>
										)
									}}
								/>
							</div>

							<div>
								<Button>Save</Button>
							</div>
						</form>
					</Form>
				) : (
					<p>Loading... </p>
				)}
			</div>
		</AdminDashboard>
	)
}

export default RoleSettings

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const config = await db.roles.findFirst()

	let formData = {}
	if (config) {
		formData = {
			position_roles: {
				left_wing: config.left_wing,
				left_defense: config.left_defense,
				right_wing: config.right_wing,
				right_defense: config.right_defense,
				center: config.center,
				goalie: config.goalie,
			},
			console_roles: {
				playstation: config.playstation,
				xbox: config.xbox,
			},
			signup_add_roles: config.signup_add_roles,
			signup_remove_roles: config.signup_remove_roles,
		}
	}
	return {
		props: { formData },
	}
}
