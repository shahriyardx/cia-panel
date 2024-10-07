import CredentialsForm, {
	type CredentialsType,
	credentialsSchema,
} from "@/components/forms/credentials-form"
import AdminDashboard, { PageTitle } from "@/components/layouts/admin-dashboard"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/utils/api"
import { toast } from "sonner"

const Credentials = () => {
	const form = useForm<CredentialsType>({
		resolver: zodResolver(credentialsSchema),
	})

	const { data: settings } = api.settings.getSettings.useQuery()
	const { mutate: saveCredentials } = api.settings.saveCredentials.useMutation({
		onSuccess: () => {
			toast.success("Settings saved")
		},
	})

	const handleCredentialsSave = (values: CredentialsType) => {
		saveCredentials(values)
	}

	useEffect(() => {
		if (settings)
			form.reset({
				npsso: settings.npsso,
				xapi: settings.xapi,
				support_server: settings.support_server,
			})
	}, [form, settings])

	return (
		<AdminDashboard>
			<PageTitle>
				<h1 className="text-2xl font-bold">Credentials</h1>
			</PageTitle>

			<div className="">
				<CredentialsForm form={form} onSubmit={handleCredentialsSave} />
			</div>
		</AdminDashboard>
	)
}

export default Credentials
