import AdminDashboard, { PageTitle } from "@/components/layouts/admin-dashboard"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import useParams from "@/hooks/useParams"
import { cn } from "@/lib/utils"
import { api } from "@/utils/api"
import { Copy, Loader2 } from "lucide-react"
import React, { ReactNode } from "react"
import { IoLogoXbox, IoLogoPlaystation } from "react-icons/io"
import { FaDiscord } from "react-icons/fa"
import { toast } from "sonner"

const InfoSec = ({
	title,
	children,
	className,
}: { title: string; children: ReactNode; className?: string }) => {
	return (
		<fieldset className={cn("border p-5 rounded-md", className)}>
			<legend className="text-lg px-3 font-bold">{title}</legend>
			<div>{children}</div>
		</fieldset>
	)
}

const UId = () => {
	const { uid } = useParams<{ uid: string }>()
	const { data: info, isLoading } = api.signUp.submissionById.useQuery(
		{
			uid,
		},
		{
			enabled: !!uid,
		},
	)

	return (
		<AdminDashboard>
			{isLoading && <Loader2 className="animate-spin mt-5" />}
			{info && (
				<div className="mt-5">
					<div className="flex gap-10 items-center">
						<div className="flex gap-3 items-center">
							<div className="relative">
								<Avatar>
									<AvatarImage src={info.user.image} />
								</Avatar>
								<FaDiscord className="absolute top-1 right-1 translate-x-1/2 -translate-y-1/2 bg-indigo-500 p-0.5 rounded-full " />
							</div>

							<div>
								<p>{info.user.name}</p>
								<p className="text-muted-foreground flex gap-2 items-center">
									{info.user.discordId}
									<Copy
										className="w-4 h-4 cursor-pointer"
										onClick={() => {
											window.navigator.clipboard.writeText(info.user.discordId)
											toast.success("id copied to clipboard")
										}}
									/>
								</p>
							</div>
						</div>

						<div className="flex gap-3">
							<p className="text-5xl">
								{info.primaryConsole === "playstation" ? (
									<IoLogoPlaystation />
								) : (
									<IoLogoXbox />
								)}
							</p>
							<div>
								<p className="capitalize">
									{info.primaryConsole === "playstation" ? (
										<p>
											{info.psn}{" "}
											<span className="text-xs text-muted-foreground">
												({info.psn_account_id})
											</span>
										</p>
									) : (
										`${info.gamertag} (${info.xbox_account_id})`
									)}
								</p>
								<p className="text-muted-foreground flex gap-2 items-center">
									{info.console_ip}{" "}
									<Copy
										className="w-4 h-4 cursor-pointer"
										onClick={() => {
											window.navigator.clipboard.writeText(
												info.console_ip as string,
											)
											toast.success("ip copied to clipboard")
										}}
									/>
								</p>
							</div>
						</div>
					</div>

					<div className="mt-5">
						<InfoSec title="User Info">
							<p>Birthday: {info.birthday.toLocaleDateString()}</p>
							<p>Gender: {info.gender}</p>
							<p>Gender: {info.city}</p>
							<p>Phone: {info.phone}</p>
						</InfoSec>
					</div>

					<div className="mt-5">
						<InfoSec title="Player Info">
							<p>Primary Position: {info.primaryPosition}</p>
							<p>Secondary Position: {info.secondaryPosition}</p>
							<p>Jersey Number: {info.jerseyNumber}</p>
						</InfoSec>
					</div>
				</div>
			)}
		</AdminDashboard>
	)
}

export default UId
