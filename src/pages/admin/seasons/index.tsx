import AdminDashboard, { PageTitle } from "@/components/layouts/admin-dashboard"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { boolean } from "zod"

const Seasons = () => {
	const [s, sets] = useState("")
	const [def, setDef] = useState(false)

	const [open, setOpen] = useState(false)

	return (
		<AdminDashboard>
			<PageTitle>
				<div className="flex justify-between">
					<h1 className="text-2xl font-bold">Seasons</h1>

					<Button onClick={() => setOpen(true)}>New Season</Button>
					<Dialog open={open} onOpenChange={(val) => setOpen(val)}>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Create New Season</DialogTitle>
							</DialogHeader>

							<div>
								<div className="flex flex-col gap-2">
									<Input
										id="name"
										value={s}
										onChange={(e) => sets(e.target.value)}
										placeholder="Season Name"
										className="col-span-3"
									/>
								</div>

								<div className="mt-2">
									<Label htmlFor="def" className="text-right"></Label>
									<div className="col-span-3 flex items-center gap-2">
										<Checkbox
											checked={def}
											onCheckedChange={(val) => setDef(Boolean(val))}
											id="def"
										/>
										<label htmlFor="def" className="text-muted-foreground">
											Default Season
										</label>
									</div>
								</div>
								<div className="mt-2">
									<Label htmlFor="def" className="text-right"></Label>
									<div className="col-span-3 flex items-center gap-2">
										<Checkbox
											checked={def}
											onCheckedChange={(val) => setDef(Boolean(val))}
											id="def"
										/>
										<label htmlFor="def" className="text-muted-foreground">
											is Playoff
										</label>
									</div>
								</div>
							</div>
							<DialogFooter>
								<Button type="button">Save changes</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</PageTitle>
		</AdminDashboard>
	)
}

export default Seasons
