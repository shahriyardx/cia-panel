import { api } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

type DiscordRole = {
	id: string
	name: string
}

type DiscordChannel = {
	id: string
	name: string
}

export const useChannels = () => {
	const { data: settings, isLoading } = api.settings.getSettings.useQuery()

	const { data: channels } = useQuery<DiscordChannel[]>({
		queryKey: ["channels", settings?.support_server],
		enabled: !isLoading && !!settings,
		queryFn: () =>
			fetch(`/api/discord/channels?guildId=${settings?.support_server}`).then(
				(response) => response.json(),
			),
		initialData: [] as DiscordChannel[],
	})

	return channels
}

export const useRoles = () => {
	const { data: settings, isLoading } = api.settings.getSettings.useQuery()

	const { data: roles } = useQuery<DiscordRole[]>({
		queryKey: ["channels", settings?.support_server],
		enabled: !isLoading && !!settings,
		queryFn: () =>
			fetch(`/api/discord/roles?guildId=${settings?.support_server}`).then(
				(response) => response.json(),
			),
		initialData: [] as DiscordRole[],
	})

	return roles
}
