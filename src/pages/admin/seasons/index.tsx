import AdminDashboard, { PageTitle } from "@/components/layouts/admin-dashboard"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { z } from "zod"
import { api } from "@/utils/api"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import {
	ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@/server/api/root"
import { DataTable } from "@/components/ui/data-table"

export const seasonSchema = z.object({
	name: z.string().min(1),
	playOff: z.boolean().default(false),
	default: z.boolean().default(false),
})

export type SeasonCreateType = z.infer<typeof seasonSchema>

const Seasons = () => {
	const form = useForm<SeasonCreateType>({
		resolver: zodResolver(seasonSchema),
	})

	const [open, setOpen] = useState(false)

	const { data: seasons } = api.season.seasons.useQuery()
	const { mutate: createSeason } = api.season.createSeason.useMutation({
		onSuccess: () => {
			toast.success("Season Created")
			setOpen(false)
			form.reset({
				name: "",
				playOff: false,
				default: false,
			})
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const handleSubmit = (values: SeasonCreateType) => {
		createSeason(values)
	}

	const columns: ColumnDef<
		inferRouterOutputs<AppRouter>["season"]["seasons"][number]
	>[] = [
		{
			accessorKey: "name",
		},
		{
			accessorKey: "playOff",
			cell: ({ row }) => {
				return row.original.playOff ? "Yes" : "No"
			},
		},
		{
			header: "Actions",
			cell: () => {
				return (
					<div className="flex gap-2">
						<Button variant="secondary">Set Default</Button>
						<Button variant="destructive">Delete</Button>
					</div>
				)
			},
		},
	]

	const table = useReactTable({
		columns,
		data: seasons ?? [],
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<AdminDashboard>
			<PageTitle>
				<div className="flex justify-between">
					<h1 className="text-2xl font-bold">Seasons</h1>

					<Dialog open={open} onOpenChange={(val) => setOpen(val)}>
						<DialogTrigger>
							<Button>New Season</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Create New Season</DialogTitle>
							</DialogHeader>

							<div>
								<Form {...form}>
									<form className="space-y-5">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Season Name</FormLabel>
													<FormControl>
														<Input placeholder="Season Name" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="default"
											render={({ field }) => (
												<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
													<FormControl>
														<Checkbox
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
													<div className="space-y-1 leading-none">
														<FormLabel>Default Season</FormLabel>
														<FormDescription>
															will make this season default
														</FormDescription>
													</div>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="playOff"
											render={({ field }) => (
												<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
													<FormControl>
														<Checkbox
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
													<div className="space-y-1 leading-none">
														<FormLabel>Playoff</FormLabel>
														<FormDescription>
															will make this season playoff
														</FormDescription>
													</div>
												</FormItem>
											)}
										/>
									</form>
								</Form>
							</div>
							<DialogFooter>
								<Button type="button" onClick={form.handleSubmit(handleSubmit)}>
									Save changes
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</PageTitle>

			<div>
				<div>
					<DataTable table={table} />
				</div>
			</div>
		</AdminDashboard>
	)
}

export default Seasons
