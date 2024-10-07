import Link from "next/link"

import { Button, type ButtonProps } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	ChevronDown,
	Grid2X2,
	Settings2,
	UserRoundCog,
	Variable,
	type LucideIcon,
} from "lucide-react"

import { useRouter } from "next/router"
import { cn } from "@/lib/utils"

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"

const Sidebar = () => {
	return (
		<ScrollArea className="p-5 pb-10 h-screen border-r">
			<div className="flex flex-col">
				<IconLink href="/admin" Icon={Grid2X2}>
					<span>Home</span>
				</IconLink>
				<Collapsible>
					<CollapsibleTrigger className="w-full">
						<Button
							variant={"ghost"}
							className="justify-start hover:bg-secondary w-full"
							asChild
						>
							<div>
								<Settings2 size={16} className="mr-2" />
								<span>Settings</span>
								<ChevronDown
									size={12}
									className="text-muted-foreground ml-auto"
								/>
							</div>
						</Button>
					</CollapsibleTrigger>
					<CollapsibleContent className="w-full pl-5">
						<div className="border-l">
							<IconLink href="/admin/settings/credentials" Icon={Variable}>
								<span>Credentials</span>
							</IconLink>
							<IconLink href="/admin/settings/roles" Icon={UserRoundCog}>
								<span>Roles</span>
							</IconLink>
						</div>
					</CollapsibleContent>
				</Collapsible>
			</div>
		</ScrollArea>
	)
}

export default Sidebar

const IconLink = ({
	children,
	Icon,
	href,
	className,
	...props
}: ButtonProps & { href: string; Icon: LucideIcon }) => {
	const { pathname } = useRouter()
	const active = pathname === href

	return (
		<Button
			{...props}
			variant={`${active ? "secondary" : "ghost"}`}
			className={cn("justify-start hover:bg-secondary w-full", className)}
			asChild
		>
			<Link href={href}>
				<Icon size={16} className="mr-2" />
				{children}
			</Link>
		</Button>
	)
}
