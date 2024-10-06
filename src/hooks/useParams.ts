import { useRouter } from "next/router"

export default function useParams<T extends Record<string, string>>() {
	const router = useRouter()
	return router.query as T
}
