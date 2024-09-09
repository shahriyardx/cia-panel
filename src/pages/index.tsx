import MainLayout from "@/components/layouts/main"
import { Button } from "@/components/ui/button"
import React from "react"

const Home = () => {
	return (
		<MainLayout>
			<div className="bg-banner bg-center">
				<div className="container mx-auto py-20 grid grid-cols-1 md:grid-cols-2">
					<div>
						<h1 className="text-4xl font-bold">Covert Ice Alliance — CIA</h1>
						<p className="mt-2 text-secondary-foreground">
							The Covert Ice Alliance is not just another hockey league,
							it&apos;s a sanctuary for true sportsmanship, integrity, and
							camaraderie. Designed as a private, invite-only league, we&apos;ve
							eliminated the toxicity found in standard leagues by creating a
							space where players take accountability seriously.
						</p>

						<Button className="mt-5">Join Us Now &rarr;</Button>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export default Home
