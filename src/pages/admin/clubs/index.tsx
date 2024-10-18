import AdminDashboard, { PageTitle } from "@/components/layouts/admin-dashboard"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import z from "zod"
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
import { clubSchema } from "@/server/schema/club.schema"
import { api } from "@/utils/api"
import { toast } from "sonner"
import {
	ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { Club } from "@prisma/client"
import Image from "next/image"
import { DataTable } from "@/components/ui/data-table"

const Seasons = () => {
	const [open, setOpen] = useState(false)
	const [editing, setEditing] = useState(false)

	const form = useForm<z.infer<typeof clubSchema>>({
		resolver: zodResolver(clubSchema),
	})

	const { mutate } = api.club.createClub.useMutation({
		onSuccess: (data) => {
			toast.success(data.message)
			setOpen(false)
			refetch()
			form.reset({
				clubId: "",
				name: "",
				image: "",
			})
		},
	})

	const { mutate: deleteClub } = api.club.deleteClub.useMutation({
		onSuccess: (data) => {
			toast.success("club deleted")
			refetch()
		},
	})

	const createClub = (values: z.infer<typeof clubSchema>) => {
		mutate(values)
	}

	const { data: clubs, refetch } = api.club.clubs.useQuery()

	const cols: ColumnDef<Club>[] = [
		{
			accessorKey: "image",
			header: "Image",
			cell: ({ row }) => {
				return (
					<Image
						src={row.original.image}
						alt={row.original.name}
						width={200}
						height={200}
						className="rounded-full w-8 h-8"
					/>
				)
			},
		},
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorKey: "clubId",
			header: "Club ID",
		},
		{
			header: "Actions",
			cell: ({ row }) => {
				return (
					<div className="flex gap-2">
						<Button>View</Button>
						<Button
							variant="secondary"
							type="button"
							onClick={() => {
								form.reset({
									name: row.original.name,
									image: row.original.image,
									clubId: row.original.clubId,
								})

								setOpen(true)
								setEditing(true)
							}}
						>
							Edit
						</Button>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="destructive">Delete</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										the club and all the associated data of this club
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => deleteClub({ id: row.original.id })}
									>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				)
			},
		},
	]

	const table = useReactTable({
		columns: cols,
		data: clubs || [],
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<AdminDashboard>
			<PageTitle>
				<div className="flex justify-between">
					<h1 className="text-2xl font-bold">Clubs</h1>

					<Button onClick={() => setOpen(true)}>New Club</Button>
					<Dialog
						open={open}
						onOpenChange={(val) => {
							if (!val) {
								setEditing(false)
							}
							setOpen(val)
						}}
					>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>
									{editing ? "Edit Club" : "Add New Club"}
								</DialogTitle>
							</DialogHeader>
							<Form {...form}>
								<form className="space-y-5">
									<FormField
										control={form.control}
										name="clubId"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Club Id</FormLabel>
												<FormControl>
													<Input placeholder="Club Id" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input placeholder="Club Name" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="image"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Image URL</FormLabel>
												<FormControl>
													<Input placeholder="Club Image URL" {...field} />
												</FormControl>
												<FormMessage />
												<FormDescription>
													this will be a file select in future
												</FormDescription>
											</FormItem>
										)}
									/>
								</form>
							</Form>
							<DialogFooter>
								<Button
									type="button"
									onClick={() => {
										console.log("first")
										form.handleSubmit((values) => createClub(values))()
									}}
								>
									Save changes
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</PageTitle>

			<div>
				<DataTable table={table} />
			</div>
		</AdminDashboard>
	)
}

export default Seasons
