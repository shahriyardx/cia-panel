import CredentialsForm, {
	type CredentialsType,
	credentialsSchema,
} from "@/components/forms/credentials-form"
import AdminDashboard, { PageTitle } from "@/components/layouts/admin-dashboard"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/utils/api"
import { toast } from "sonner"
import { z } from "zod"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export const settingSchema = z.object({
	support_server: z.string().min(1),
	pullGames: z.boolean().default(true),
	seasonId: z.string().min(1),
})

export type SettingsType = z.infer<typeof settingSchema>

const Settings = () => {
	const form = useForm<SettingsType>({
		resolver: zodResolver(settingSchema),
	})

	const { data: settings } = api.settings.getSettings.useQuery()

	const { data: seasons } = api.season.seasons.useQuery()
	const { mutate: saveSettings } = api.settings.saveSettings.useMutation({
		onSuccess: () => {
			toast.success("Settings saved")
		},
	})

	const handleSubmit = (values: SettingsType) => {
		saveSettings(values)
	}

	useEffect(() => {
		if (settings)
			form.reset({
				support_server: settings.support_server,
				seasonId: settings.seasonId as string,
				pullGames: settings.pullGames,
			})
	}, [form, settings])

	return (
		<AdminDashboard>
			<PageTitle>
				<h1 className="text-2xl font-bold">Credentials</h1>
			</PageTitle>

			<div className="">
				{settings && (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-5"
						>
							<FormField
								control={form.control}
								name="support_server"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Support Server</FormLabel>
										<FormControl>
											<Input placeholder="Support Server ID" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="pullGames"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Pull Games Automatically</FormLabel>
											<FormDescription>
												wheather or not to pull and store games automatically
											</FormDescription>
										</div>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="seasonId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Current Season</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													{field.value ? (
														<SelectValue
															placeholder={
																seasons?.find(
																	(season) => season.id === field.value,
																)?.name
															}
														/>
													) : (
														"Select Season"
													)}
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{seasons?.map((season) => (
													<SelectItem value={season.id} key={season.id}>
														{season.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit">Submit</Button>
						</form>
					</Form>
				)}
			</div>
		</AdminDashboard>
	)
}

export default Settings
