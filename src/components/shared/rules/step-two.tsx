import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dot } from "lucide-react"
import React, { ReactNode } from "react"

type Props = {
	agreed: boolean
	setIsChecked: (isChecked: boolean) => void
	children?: ReactNode
}

const StepTwo = ({ agreed, setIsChecked, children }: Props) => {
	return (
		<div className="mt-5">
			<p className="text-lg font-extrabold">
				Please take a moment to read the following bullet points and if you
				agree to the our foundation then please take the Oath to Protect the
				League.
			</p>

			<div className="mt-5">
				<div className="grid gap-2">
					<div>
						<Label>
							1. This is a non-toxic league. We are a brotherhood and
							sisterhood. We are here for each other to create the best league.
						</Label>

						<ul className="text-sm mt-2">
							<li>
								<Dot className="inline-block text-primary" /> We have a 3 Strike
								System.
							</li>
							<li>
								<Dot className="inline-block text-primary" />
								1st strike is a warning (7 day mute) - this can be reduced with
								a mute appeal and buyout.
							</li>
							<li>
								<Dot className="inline-block text-primary" />
								2nd strike is a (21 day mute) - this can be reduced with a mute
								appeal and buyout.
							</li>
							<li>
								<Dot className="inline-block text-primary" />
								3rd strike will result in a Toxic Ban - this can be appealed and
								bought out.
							</li>
						</ul>
					</div>

					<div>
						<Label>
							2. Do not DOX people (No Personal Information) - Instant Toxic Ban
						</Label>
					</div>

					<div>
						<Label>
							3. Do not threaten people (No Hate Speech or Harmful Language)
						</Label>
					</div>

					<div>
						<Label>4. Do not refuse to play for anyone</Label>
					</div>

					<div>
						<Label>
							5. Do not cheat or knowingly let others cheat - Instant Cheat Ban
						</Label>
					</div>

					<div>
						<Label>6. Do not talk about politics or religion</Label>
					</div>

					<div>
						<Label>
							7. Rules are subject to common sense, What we deem toxic, you
							might not. Proceed with caution.
						</Label>
					</div>

					<div>
						<Label>
							8. Admin and Staff volunteer their time for the league, treat them
							with respect
						</Label>
					</div>

					<div>
						<Label>9. Do not harmfully comment about the following:</Label>
						<ul className="text-sm mt-2">
							<li>
								<Dot className="inline-block text-primary" /> Spouses
							</li>
							<li>
								<Dot className="inline-block text-primary" />
								Children
							</li>
							<li>
								<Dot className="inline-block text-primary" />
								Mothers
							</li>
							<li>
								<Dot className="inline-block text-primary" />
								Sexual Orientation/Preference
							</li>
							<li>
								<Dot className="inline-block text-primary" />
								Race
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="items-top flex space-x-2 mt-5">
				<Checkbox
					onCheckedChange={(val) =>
						setIsChecked(val === "indeterminate" ? false : val)
					}
					id="terms"
				/>
				<div className="grid gap-1.5 leading-none">
					<label
						htmlFor="terms"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						I agree to all of above and willing to take the Oath to protect the
						League
					</label>
					<p className="text-sm text-muted-foreground">
						by clicking this we assume that you have read all the points above
						and did not skip any of them.
					</p>
				</div>
			</div>

			{children}
		</div>
	)
}

export default StepTwo
