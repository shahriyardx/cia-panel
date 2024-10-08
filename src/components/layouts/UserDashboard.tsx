import React, { ReactNode } from "react"
import Sidebar from "../dashboard/Sidebar"
import { ScrollArea } from "../ui/scroll-area"
import RequireDiscord from "../shared/require-discord"

const UserDashboard = ({ children }: { children?: ReactNode }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-[300px_auto]">
			<Sidebar />
			<ScrollArea className="h-screen">
				<div className="container mx-auto py-20">{children}</div>
			</ScrollArea>
		</div>
	)
}

export default UserDashboard
