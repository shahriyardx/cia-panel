import { Check } from "lucide-react"
import React, { ReactNode } from "react"

type Props = {
	children: ReactNode
}

const StepOne = ({ children }: Props) => {
	return (
		<div className="mt-5">
			<p className="text-lg font-extrabold">
				IF YOU DO NOT FOLLOW EACH STEP SPECIFICALLY AND GET BANNED THROUGH
				VERIFICATION YOU WILL HAVE TO APPEAL YOUR BAN AND PAY TO BE UNBANNED
			</p>

			<p className="text-lg font-extrabold mt-3">
				YOU ARE AGREEING AND CONSENTING TO RULES AND DATA ACQUIRED. WE HAVE ZERO
				TOLERANCE AND WILL GIVE NO LEEWAY.
			</p>

			<div className="mt-5">
				<p className="underline">A few things before we get started</p>
				<ul>
					<li className="flex items-center gap-2">
						<Check className="text-primary" size={14} /> You must be home and
						connected to your home internet to verify.
					</li>
					<li className="flex items-center gap-2">
						<Check className="text-primary" size={14} /> You must have access to
						the internet from your home.
					</li>
					<li className="flex items-center gap-2">
						<Check className="text-primary" size={14} /> You must have your
						video game console available and connected to your home internet!
					</li>
				</ul>
				<p className="mt-2">
					We hope you believe in what we are building and hope you want to be a
					part of it. If you can meet each objective above, Please Click
					Continue.
				</p>
			</div>

			<div>{children}</div>
		</div>
	)
}

export default StepOne
