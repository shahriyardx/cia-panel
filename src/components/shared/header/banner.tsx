import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Banner = () => {
	return (
		<div className="bg-banner bg-center">
			<div className="container mx-auto py-20 grid grid-cols-1 md:grid-cols-2 px-5">
				<div className="flex flex-col justify-center">
					<h1 className="text-4xl font-bold">Covert Ice Alliance — CIA</h1>
					<p className="mt-2 text-secondary-foreground">
						The Covert Ice Alliance is not just another hockey league, it&apos;s
						a sanctuary for true sportsmanship, integrity, and camaraderie.
						Designed as a private, invite-only league, we&apos;ve eliminated the
						toxicity found in standard leagues by creating a space where players
						take accountability seriously.
					</p>

					<div>
						<Button className="mt-5" asChild>
							<Link href="/dashboard/sign-up">Join Us Now &rarr;</Link>
						</Button>
					</div>
				</div>

				<div className="flex items-center justify-center">
					<Image
						src="/images/logo.png"
						width={300}
						height={300}
						alt="Logo"
						className="h-full"
					/>
				</div>
			</div>
		</div>
	)
}

export default Banner
