import Image from "next/image"
import Link from "next/link"
import React, { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ChevronLeft, Send } from "lucide-react"
import StepOne from "@/components/shared/rules/step-one"
import StepTwo from "@/components/shared/rules/step-two"
import { toast } from "sonner"
import { api } from "@/utils/api"
import { useRouter } from "next/router"

const ConsoleVerification = () => {
	const [step, setStep] = React.useState(1)
	const [isChecked, setIsChecked] = React.useState(false)

	const router = useRouter()

	const { data: userInfo, isLoading: userInfoLoading } =
		api.signUp.info.useQuery()
	const { mutate } = api.verification.shorten.useMutation()

	useEffect(() => {
		if (userInfoLoading) return
		if (!userInfo) {
			router.push("/dashboard/sign-up")
		}
	}, [userInfoLoading, router, userInfo])
	return (
		<div>
			<div className="container mx-auto pt-10">
				<PageHeader />

				{step === 1 && (
					<StepOne>
						<div className="mt-3">
							<Button onClick={() => setStep(2)}>
								Next <ArrowRight size={15} className="ml-2" />
							</Button>
						</div>
					</StepOne>
				)}
				{step === 2 && (
					<>
						<StepTwo agreed={isChecked} setIsChecked={setIsChecked}>
							<div className="mt-3 flex gap-2">
								<Button onClick={() => setStep(1)} variant="secondary">
									<ArrowLeft size={15} className="mr-2" />
									Prev
								</Button>
								<Button
									onClick={() => {
										if (!isChecked) {
											return toast.error(
												"You must agree to the terms and conditions",
											)
										}

										setStep(3)
									}}
								>
									Next <ArrowRight size={15} className="ml-2" />
								</Button>
							</div>
						</StepTwo>
					</>
				)}

				{step === 3 && (
					<div className="mt-5">
						<h1 className="text-4xl font-bold">Console Verfication</h1>
						<p className="text-muted-foreground mt-1">
							Now you have to verify your console from your actual console
							device (XBOX or PlayStation). Make sure you are home and your
							console is connected to your home internet. Click the button
							below, you will receive a message on your console with a link that
							will verify your console. You have to click the link from your
							console, not your phone or computer (the bot is looking for a
							specific agent to return, we will know if it isn’t from the
							console) and follow the steps to verify your console. If you are
							unable to click the link, then retype the link and send back to us
							and then you will be able to click the link. There you will see a
							button which you have to click to finish your verification process
						</p>

						<div className="mt-3">
							<Button
								onClick={() =>
									mutate({
										url: `${window.location.origin}/verify/${userInfo?.id}`,
									})
								}
							>
								<Send className="mr-2" size={15} />
								Send Link
							</Button>
						</div>
					</div>
				)},,,,,,,,,
			</div>
		</div>
	)
}

export default ConsoleVerification

const PageHeader = () => {
	return (
		<div className="flex items-center gap-2">
			<Image src="/images/logo.png" width={80} height={80} alt="Logo" />
			<div>
				<p className="text-4xl font-extrabold">Covert Ice Alliance - CIA</p>
				<p className="text-muted-foreground">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, modi.
				</p>
			</div>

			<Button asChild className="ml-auto">
				<Link href="/">
					<ChevronLeft className="mr-2" /> Back to Home
				</Link>
			</Button>
		</div>
	)
}
