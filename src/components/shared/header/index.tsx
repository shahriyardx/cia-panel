import Image from "next/image"
import React from "react"
import { Button } from "@/components/ui/button"
import { SiDiscord } from "@icons-pack/react-simple-icons"
import { signIn, signOut, useSession } from "next-auth/react"

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const Header = () => {
	const { data, status } = useSession()

	return (
		<div>
			<div className="container mx-auto py-4">
				<div className="flex items-center gap-2">
					<Image src="/images/logo.png" width={50} height={10} alt="Logo" />

					<NavigationMenu className="ml-auto mr-5">
						<NavigationMenuList className="gap-5">
							<NavigationMenuItem>
								<Link href="/">Home</Link>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<Link href="/shop">Shop</Link>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<Link href="/contact">About</Link>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<Link href="/contact">Contact</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>

					{(status === "unauthenticated" || status === "loading") && (
						<Button
							onClick={() => signIn("discord")}
							variant="secondary"
							size={status === "loading" ? "icon" : "default"}
							disabled={status === "loading"}
						>
							{status === "loading" ? (
								<Loader2 size={15} className="animate-spin" />
							) : (
								<SiDiscord size={15} />
							)}
							{status === "unauthenticated" && (
								<span className="ml-2">Login</span>
							)}
						</Button>
					)}

					{status === "authenticated" && (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar>
									<AvatarImage src={data.user.image} />
									<AvatarFallback>CA</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>{data.user.name}</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Dashboard</DropdownMenuItem>
								<DropdownMenuItem
									className="bg-destructive"
									onSelect={() => signOut()}
								>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
