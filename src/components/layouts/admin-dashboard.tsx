import { cn } from "@/lib/utils"
import type { ComponentProps, ReactNode } from "react"
import Sidebar from "@/components/sidebar"
import { ScrollArea } from "../ui/scroll-area"
import RequireAdmin from "../shared/require-admin"

type Props = ComponentProps<"div">

const AdminDashboard = ({ children, className, ...props }: Props) => {
	return (
		<RequireAdmin>
			<div className={cn("grid grid-cols-[300px_auto]", className)} {...props}>
				<Sidebar />
				<ScrollArea className={cn(`h-screen pb-10 px-5`)}>
					<main className="container mx-auto">{children}</main>
				</ScrollArea>
			</div>
		</RequireAdmin>
	)
}

export default AdminDashboard

export const PageTitle = ({ children }: { children: ReactNode }) => {
	return <div className="py-3">{children}</div>
}
