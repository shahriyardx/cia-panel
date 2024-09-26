import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { type ReactNode } from "react"

type Props = {
	children: ReactNode
}

const RequireAdmin = ({ children }: Props) => {
	const router = useRouter()
	const { data, status } = useSession({
		required: true,
		onUnauthenticated: () => {
			router.push("/login")
		},
	})

	if (status === "loading") {
		return (
			<div className="w-full h-screen grid place-items-center">
				<Loader2 className="animate-spin" />
			</div>
		)
	}

	if (data.is_admin) {
		return children
	}

	return <p>You are not authorized to view this page.</p>
}

export default RequireAdmin
