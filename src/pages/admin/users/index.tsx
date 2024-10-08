import AdminDashboard, { PageTitle } from "@/components/layouts/admin-dashboard"
import { api } from "@/utils/api"
import React from "react"
import {
	ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { AppRouter } from "@/server/api/root"
import { inferRouterOutputs } from "@trpc/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Row } from "react-day-picker"

type Submissions = inferRouterOutputs<AppRouter>["signUp"]["allSubmissions"]

const UsersPage = () => {
	const { data: submissions } = api.signUp.allSubmissions.useQuery()

	const columns: ColumnDef<Submissions[number]>[] = [
		{
			accessorKey: "discordId",
			header: "Avatar",
		},
		{
			accessorKey: "user.name",
			header: "Username",
		},
		{
			accessorKey: "discordId",
			header: "Discord ID",
		},
		{
			accessorKey: "primaryConsole",
			header: "Primary Console",
		},
		{
			header: "Console PSN/Gamertag",
			cell: ({ row }) => {
				return row.original.primaryConsole === "playstation"
					? row.original.psn
					: row.original.gamertag
			},
		},
		{
			header: "More Info",
			cell: ({ row }) => {
				return (
					<Button variant={"outline"} asChild>
						<Link href={`/admin/users/${row.original.id}`}>View Full Info</Link>
					</Button>
				)
			},
		},
	]

	const table = useReactTable({
		columns,
		data: submissions || [],
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<AdminDashboard>
			<PageTitle>
				<h1 className="text-2xl font-bold">Users</h1>

				<div className="mt-5">
					<DataTable table={table} />
				</div>
			</PageTitle>
		</AdminDashboard>
	)
}

export default UsersPage
