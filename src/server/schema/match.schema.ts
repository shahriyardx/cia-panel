export type MatchClub = {
	clubDivision: string
	cNhlOnlineGameType: string
	garaw: string
	gfraw: string
	losses: string
	memberString: string
	opponentClubId: string
	opponentScore: string
	opponentTeamArtAbbr: string
	passa: string
	passc: string
	ppg: string
	ppo: string
	result: string
	score: string
	scoreString: string
	shots: string
	teamArtAbbr: string
	teamSide: string
	toa: string
	winnerByDnf: string
	winnerByGoalieDnf: string
	goals: string
	goalsAgainst: string
  details: {
    clubId: string
  }
}

export type MatchPlayer = {
	class: string
	glbrksavepct: string
	glbrksaves: string
	glbrkshots: string
	gldsaves: string
	glga: string
	glgaa: string
	glpensavepct: string
	glpensaves: string
	glpenshots: string
	glpkclearzone: string
	glpokechecks: string
	glsavepct: string
	glsaves: string
	glshots: string
	glsoperiods: string
	isGuest: string
	opponentClubId: string
	opponentScore: string
	opponentTeamId: string
	player_dnf: string
	playerLevel: string
	pNhlOnlineGameType: string
	position: string
	posSorted: string
	ratingDefense: string
	ratingOffense: string
	ratingTeamplay: string
	score: string
	skassists: string
	skbs: string
	skdeflections: string
	skfol: string
	skfopct: string
	skfow: string
	skgiveaways: string
	skgoals: string
	skgwg: string
	skhits: string
	skinterceptions: string
	skpassattempts: string
	skpasses: string
	skpasspct: string
	skpenaltiesdrawn: string
	skpim: string
	skpkclearzone: string
	skplusmin: string
	skpossession: string
	skppg: string
	sksaucerpasses: string
	skshg: string
	skshotattempts: string
	skshotonnetpct: string
	skshotpct: string
	skshots: string
	sktakeaways: string
	teamId: string
	teamSide: string
	toi: string
	toiseconds: string
	playername: string
	clientPlatform: string
}

export type Match = {
	matchId: string
	timestamp: number
	timeAgo: {
		number: number
		unit: "hours"
	}
	clubs: Record<string, MatchClub>
	players: Record<string, Record<string, MatchPlayer>>
}
