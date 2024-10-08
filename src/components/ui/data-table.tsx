import { type Table, flexRender } from "@tanstack/react-table"

import {
	Table as ShadTable,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, _TValue> {
	table: Table<TData>
}

export function DataTable<TData, TValue>({
	table,
}: DataTableProps<TData, TValue>) {
	return (
		<div className="rounded-md border">
			<ShadTable>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										onClick={() => header.column.toggleSorting()}
										key={header.id}
									>
										<div
											className={cn(
												"flex items-center gap-2",
												header.column.getCanSort() && "cursor-pointer",
											)}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</div>
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getPaginationRowModel().rows?.length ? (
						table.getPaginationRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={table.getAllColumns().length}
								className="h-24 text-center"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</ShadTable>
		</div>
	)
}
