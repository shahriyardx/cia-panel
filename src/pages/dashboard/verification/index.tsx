import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ChevronLeft, Loader2, Send } from "lucide-react"
import StepOne from "@/components/shared/rules/step-one"
import StepTwo from "@/components/shared/rules/step-two"
import { toast } from "sonner"
import { api } from "@/utils/api"
import { useRouter } from "next/router"
import PageHeader from "@/components/shared/header/page-header"

const ConsoleVerification = () => {
	const [step, setStep] = useState(1)
	const [loadingVerification, setLoadingVerification] = useState(false)
	const [isChecked, setIsChecked] = React.useState(false)

	const router = useRouter()

	const {
		data: userInfo,
		isLoading: userInfoLoading,
		refetch,
	} = api.signUp.info.useQuery()
	const { mutate } = api.message.sendMessage.useMutation({
		onSuccess: () => {
			toast.success("Link has been sent, Please check your console")
			setLoadingVerification(true)
			setStep((prev) => prev + 1)
		},
	})

	useEffect(() => {
		if (userInfoLoading) return
		if (!userInfo) {
			router.push("/dashboard/sign-up")
		}

		if (userInfo?.console_verified) {
			router.push("/dashboard/verification/success")
		}
	}, [userInfoLoading, router, userInfo])

	return (
		<div>
			<div className="container mx-auto pt-10">
				<PageHeader
					headerRight={
						<Button asChild className="ml-auto">
							<Link href="/">
								<ChevronLeft className="mr-2" /> Back to Home
							</Link>
						</Button>
					}
				/>

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
								onClick={() => {
									mutate({
										url: `${window.location.origin}/verify/${userInfo?.id}`,
									})

									fetch(`/api/verify/${userInfo?.id}/user`)
								}}
							>
								<Send className="mr-2" size={15} />
								Send Link
							</Button>
						</div>
					</div>
				)}

				{step >= 4 && loadingVerification && (
					<div className="mt-5">
						<p className="text-2xl font-bold flex items-center">
							<Loader2 className="mr-2 animate-spin" />
							<span>Verification Pending</span>
						</p>

						<p>Complete Verification on your console and get back to here.</p>

						<Button onClick={() => refetch()} className="mt-2">
							Done
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default ConsoleVerification
