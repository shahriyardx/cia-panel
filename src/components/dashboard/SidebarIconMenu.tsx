import type { LucideIcon } from "lucide-react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import type { ReactNode } from "react"
import { Button } from "../ui/button"

type Props = LinkProps & {
	text: ReactNode
	Icon: LucideIcon
	external?: boolean
}

const SidebarIconMenu = ({ href, text, Icon, external }: Props) => {
	const router = useRouter()
	const active = router.asPath === href

	return (
		<Button
			asChild
			variant={active ? "secondary" : "ghost"}
			className="w-full justify-start"
		>
			<Link href={href} rel="noreferrer" target={external ? "_blank" : "_self"}>
				<Icon className="mr-2" />
				<span>{text}</span>
			</Link>
		</Button>
	)
}

export default SidebarIconMenu
