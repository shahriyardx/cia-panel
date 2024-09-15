import React from "react"
import { Button } from "../ui/button"
import SidebarIconMenu from "./SidebarIconMenu"
import { Grid2X2, User, UserPlus2 } from "lucide-react"

const Sidebar = () => {
	return (
		<div className="p-5">
			<SidebarIconMenu href={`/dashboard`} text="Dashboard" Icon={Grid2X2} />
			<SidebarIconMenu href={`/dashboard/profile`} text="Profile" Icon={User} />
			<SidebarIconMenu
				href={`/dashboard/sign-up`}
				text="Sign Up"
				Icon={UserPlus2}
			/>
		</div>
	)
}

export default Sidebar
