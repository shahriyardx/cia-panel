import { authRouter } from "@/server/api/routers/auth"
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"
import { signUpRouter } from "./routers/sign-up"
import { settingsRouter } from "./routers/settings"
import { messageRouter } from "./routers/message"
import { clubRouter } from "./routers/club.router"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	auth: authRouter,
	signUp: signUpRouter,
	settings: settingsRouter,
	message: messageRouter,
	club: clubRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
