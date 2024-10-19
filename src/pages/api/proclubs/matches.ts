import { env } from "@/env"
import { db } from "@/server/db"
import { Match, MatchClub } from "@/server/schema/match.schema"
import fetch from "isomorphic-unfetch"
import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const clubs = await db.club.findMany()
	const settings = await db.settings.findFirst()

	if (!settings || !settings.seasonId) return
	const seasonId = settings.seasonId

	clubs.forEach(async (club) => {
		const response = await fetch(
			`https://proclubs.ea.com/api/nhl/clubs/matches?clubIds=${club.clubId}&platform=common-gen5&matchType=club_private`,
			{
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
					Referer: "https://www.ea.com/",
					Origin: "https://www.ea.com",
					"Accept-Encoding": "gzip, deflate, br, zstd",
					Accept: "application/json",
				},
			},
		)

		const data = (await response.json()) as Match[]

		for (const match of data) {
			const matchStored = await db.match.findFirst({
				where: {
					matchId: match.matchId,
				},
			})

			if (matchStored) {
				continue
			}

			const matchClubs = Object.values(match.clubs)
			const home = matchClubs.find((club) => club.teamSide === "0") as MatchClub
			const away = matchClubs.find((club) => club.teamSide === "1") as MatchClub

			const homeClub = await db.club.findFirst({
				where: {
					clubId: String(home.details.clubId),
				},
			})

			const awayClub = await db.club.findFirst({
				where: {
					clubId: String(away.details.clubId),
				},
			})

			console.log(homeClub)
			console.log(awayClub)

			if (!homeClub || !awayClub) {
				continue
			}

			const matchData = await db.match.create({
				data: {
					matchId: match.matchId,
					timestamp: String(match.timestamp),
					homeGoal: home.goals,
					awayGoal: away.goals,
					seasonId,
				},
			})

			const { details: homeDetails, ...homeOthers } = home
			const { details: awayDetails, ...awayOthers } = away

			console.log(
				"⚡⚡⚡ inserting club ⚡⚡⚡",
				homeDetails.clubId,
				awayDetails.clubId,
			)

			await db.matchClub.create({
				data: {
					seasonId,
					matchId: matchData.id,
					clubId: String(homeDetails.clubId),
					clubAgainstId: String(awayDetails.clubId),
					...homeOthers,
				},
			})

			await db.matchClub.create({
				data: {
					seasonId,
					matchId: matchData.id,
					clubId: String(awayDetails.clubId),
					clubAgainstId: String(homeDetails.clubId),
					...awayOthers,
				},
			})
		}
	})

	return res.json({ working: "on it " })
}

export default handler
