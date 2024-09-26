import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"
import { load } from "@fingerprintjs/fingerprintjs"

import { api } from "@/utils/api"
import { Toaster } from "@/components/ui/sonner"

import "@/styles/globals.css"
import { useEffect } from "react"

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	// const showFinger = async () => {
	// 	const fp = await load()
	// 	const d = await fp.get()
	// 	console.log(d)
	// }
	// useEffect(() => {
	// 	showFinger()
	// }, [])
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
			<Toaster />
		</SessionProvider>
	)
}

export default api.withTRPC(MyApp)
