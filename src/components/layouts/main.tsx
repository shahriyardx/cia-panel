import React, { ReactNode } from "react"
import Header from "../shared/header"

type Props = {
	children: ReactNode
}

const MainLayout = ({ children }: Props) => {
	return (
		<>
			<Header />
			{children}
		</>
	)
}

export default MainLayout
