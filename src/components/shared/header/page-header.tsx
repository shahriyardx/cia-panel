import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { ReactNode } from "react"

type Props = {
	headerRight?: ReactNode
}

const PageHeader = (props: Props) => {
	return (
		<div className="flex items-center gap-2">
			<Image src="/images/logo.png" width={80} height={80} alt="Logo" />
			<div>
				<p className="text-4xl font-extrabold">Covert Ice Alliance - CIA</p>
				<p className="text-muted-foreground">
					Innovation on Ice, Competition with Class
				</p>
			</div>

			{props.headerRight}
		</div>
	)
}

export default PageHeader
