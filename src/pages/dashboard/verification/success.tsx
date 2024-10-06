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
	const [step, setStep] = useState(4)
	const [loadingVerification, setLoadingVerification] = useState(true)
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
	}, [userInfoLoading, router, userInfo])
	return (
		<div>
			<div className="container mx-auto pt-10">
				<PageHeader />

				<h1 className="text-4xl font-bold mt-5">Verification Completed 🎉</h1>
				<Button asChild className="mt-2">
					<Link href="/">
						<ChevronLeft className="mr-2" /> Go Home
					</Link>
				</Button>
			</div>
		</div>
	)
}

export default ConsoleVerification
