import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { type ReactNode } from "react"

type Props = {
	children: ReactNode
}

const RequireDiscord = ({ children }: Props) => {
	const router = useRouter()
	const { data, status } = useSession({
		required: true,
		onUnauthenticated: () => {
			router.push("/login")
		},
	})

	console.log(data)

	if (status === "loading") {
		return (
			<div className="w-full h-screen grid place-items-center">
				<Loader2 className="animate-spin" />
			</div>
		)
	}

	if (!data.is_in_discord) {
		return router.push("/waitlist")
	}

	return children
}

export default RequireDiscord
