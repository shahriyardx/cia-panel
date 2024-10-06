import PageHeader from "@/components/shared/header/page-header"
import { Button } from "@/components/ui/button"
import useParams from "@/hooks/useParams"
import { api } from "@/utils/api"
import React, { useState } from "react"
import { toast } from "sonner"

const VerifyUser = () => {
	const [success, setSuccess] = useState(false)
	const { userId } = useParams<{ userId: string }>()
	const { data, isLoading } = api.signUp.infoByUserId.useQuery({
		userId,
	})

	const handleVerify = async () => {
		const response = await fetch(`/api/verify/${userId}/console`)
		const data = await response.json()

		if (!data.success) {
			return toast.error(data.error)
		}

		setSuccess(true)
	}

	return (
		<div className="container mx-auto pt-10">
			<PageHeader />

			<div className="mt-5">
				{!success && (
					<>
						{!isLoading && data && (
							<p>
								Please open this link on a{" "}
								<span className="font-bold uppercase underline">
									{data.primaryConsole}
								</span>{" "}
								if you haven't and then click the Verify button
							</p>
						)}
						<p>
							Clicking verify on a windows/macbook/iphone or a wrong console
							might get you banned from the league
						</p>
						<Button className="mt-2" onClick={handleVerify}>
							Verify
						</Button>
					</>
				)}

				{success && (
					<h1 className="text-2xl font-bold">
						Successfull 🎉. You can now close this browser window
					</h1>
				)}
			</div>
		</div>
	)
}

export default VerifyUser
