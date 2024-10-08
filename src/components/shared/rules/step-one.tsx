import { Check } from "lucide-react"
import React, { ReactNode } from "react"

type Props = {
	children: ReactNode
}

const StepOne = ({ children }: Props) => {
	return (
		<div className="mt-5">
			<fieldset className="border p-5 rounded-md">
				<legend className="px-4 text-2xl font-bold">
					PLEASE REVIEW THE FOLLOWING INSTRUCTIONS CAREFULLY ⚠️
				</legend>

				<div>
					<p>
						Failure to follow each step precisely may result in a ban during the
						verification process. If banned, you will need to appeal and
						potentially pay to be reinstated. Please read the steps and rules so
						that you are aware of what you need to do and what is expected in
						our league.
					</p>

					<p className="mt-3">
						By proceeding, you agree to our rules and consent to the data
						collected. We have a strict zero-tolerance policy — no exceptions will
						be made.
					</p>

					<h3 className="font-bold mt-5">
						Important Guidelines Before You Begin:
					</h3>

					<ul className="mt-2">
						<li className="flex items-center gap-2">
							<Check className="text-primary text-green-500" size={14} /> You
							must be home and connected to your home internet to verify.
						</li>
						<li className="flex items-center gap-2">
							<Check className="text-primary text-green-500" size={14} /> You
							must have access to the internet from your home.
						</li>
						<li className="flex items-center gap-2">
							<Check className="text-primary text-green-500" size={14} /> You
							must have your video game console available and connected to your
							home internet!
						</li>
					</ul>

					<p className="mt-5">
						We believe in what we're building and hope you share our vision. If
						you can meet the above requirements, please click "Next."
					</p>
				</div>
			</fieldset>

			<div>{children}</div>
		</div>
	)
}

export default StepOne
