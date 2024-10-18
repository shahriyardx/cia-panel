import Image from "next/image"
import React from "react"
import { Button } from "@/components/ui/button"
import { SiDiscord } from "@icons-pack/react-simple-icons"
import { signIn, signOut, useSession } from "next-auth/react"

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
	DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"

const Header = () => {
	const { data, status } = useSession()
	const router = useRouter()

	return (
		<div>
			<div className="container mx-auto py-4 px-5">
				<div className="flex items-center gap-2">
					<Image src="/images/logo.png" width={50} height={10} alt="Logo" />

					<NavigationMenu className="ml-auto mr-5">
						<NavigationMenuList>
							<NavigationMenuItem className={navigationMenuTriggerStyle()}>
								<Link href="/">Home</Link>
							</NavigationMenuItem>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<NavigationMenuItem className={navigationMenuTriggerStyle()}>
										Stats
									</NavigationMenuItem>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>Standings</DropdownMenuItem>

									<DropdownMenuSub>
										<DropdownMenuSubTrigger>
											League Leaders
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem>Points</DropdownMenuItem>
												<DropdownMenuItem>PPG</DropdownMenuItem>
												<DropdownMenuItem>Goals</DropdownMenuItem>
												<DropdownMenuItem>Assits</DropdownMenuItem>
												<DropdownMenuItem>Plus/Minus</DropdownMenuItem>
												<DropdownMenuItem>Giveaways</DropdownMenuItem>
												<DropdownMenuItem>Faceoff %</DropdownMenuItem>
												<DropdownMenuItem>Hits</DropdownMenuItem>
												<DropdownMenuItem>Blocked Shots</DropdownMenuItem>
												<DropdownMenuItem>Takeaways</DropdownMenuItem>
												<DropdownMenuItem>Hat Tricks,</DropdownMenuItem>
												<DropdownMenuItem>
													Goals Against Avg. Save Percentage
												</DropdownMenuItem>
												<DropdownMenuItem>Saves</DropdownMenuItem>
												<DropdownMenuItem>Shots Faced</DropdownMenuItem>
												<DropdownMenuItem>Wins</DropdownMenuItem>
												<DropdownMenuItem>Shutouts</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub>
									<DropdownMenuItem>Player Stats</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<NavigationMenuItem className={navigationMenuTriggerStyle()}>
										Teams
									</NavigationMenuItem>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>Standings</DropdownMenuItem>
									<DropdownMenuItem>
										Current Rosters for current season
									</DropdownMenuItem>
									<DropdownMenuItem>Propose a trade</DropdownMenuItem>
									<DropdownMenuItem>Team Stats</DropdownMenuItem>
									<DropdownMenuItem>Undrafted Free Agents</DropdownMenuItem>
									<DropdownMenuItem>Late Signup Free Agents</DropdownMenuItem>
									<DropdownMenuItem>Schedule</DropdownMenuItem>
									<DropdownMenuItem>Draft</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<NavigationMenuItem className={navigationMenuTriggerStyle()}>
										Awards
									</NavigationMenuItem>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>Record Books</DropdownMenuItem>
									<DropdownMenuSub>
										<DropdownMenuSubTrigger>
											Per Season Awards
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem>Season 1</DropdownMenuItem>
												<DropdownMenuItem>Season 2</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub>
									<DropdownMenuItem>Player badges</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<NavigationMenuItem className={navigationMenuTriggerStyle()}>
										Streams
									</NavigationMenuItem>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>GreatScottie's Stream</DropdownMenuItem>
									<DropdownMenuItem>Games of the Night</DropdownMenuItem>
									<DropdownMenuItem>Supporter Streams</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<NavigationMenuItem className={navigationMenuTriggerStyle()}>
								<Link href="/merch">Merchandise</Link>
							</NavigationMenuItem>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<NavigationMenuItem className={navigationMenuTriggerStyle()}>
										About
									</NavigationMenuItem>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem onSelect={() => router.push("/about")}>
										CIA
									</DropdownMenuItem>
									<DropdownMenuItem>Staff</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
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
								<DropdownMenuItem
									onSelect={() =>
										router.push(data.is_admin ? "/admin" : "/dashboard")
									}
								>
									Dashboard
								</DropdownMenuItem>
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
