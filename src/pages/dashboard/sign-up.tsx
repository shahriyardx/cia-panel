import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useMemo } from "react"

import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronLeft, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, Radio } from "@headlessui/react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { format } from "date-fns"
import { IoLogoPlaystation, IoLogoXbox } from "react-icons/io"
import {
	SignUp,
	SignUpClient,
	signUpSchemaClient,
} from "@/server/schema/sign-up"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/utils/api"
import { toast } from "sonner"
import PageHeader from "@/components/shared/header/page-header"

const SignUpPage = () => {
	const router = useRouter()

	const { data: userInfo } = api.signUp.info.useQuery()

	const { mutate: registerUser, isPending } = api.signUp.signUp.useMutation({
		onSuccess: () => {
			toast.success("verification completed")
			router.push("/dashboard/verification")
		},
		onError: (err) => {
			toast.error(err.message)
		},
	})

	const { data: session, update } = useSession({
		required: true,
		onUnauthenticated: () => router.push("/api/auth/signin"),
	})

	const form = useForm<SignUpClient>({
		resolver: zodResolver(signUpSchemaClient),
		shouldUnregister: true,
	})

	const primaryConsole = form.watch("primaryConsole")

	const showButton = useMemo(() => {
		if (!session) return false
		if (primaryConsole === "playstation" && !session.connections.ps) {
			return true
		}

		if (primaryConsole === "xbox" && !session.connections.xbox) {
			return true
		}

		return false
	}, [primaryConsole, session])

	const completeVerification = (values: SignUp) => {
		const actualValues = {
			...values,
			psn: session?.connections.ps,
			gamertag: session?.connections.xbox,
		}
		registerUser(actualValues)
	}

	useEffect(() => {
		if (session && primaryConsole) {
			const { ps, xbox } = session.connections
			form.setValue("psn", ps)
			form.setValue("gamertag", xbox)
		}
	}, [primaryConsole, session, form.setValue])

	useEffect(() => {
		if (userInfo) {
			router.push("/dashboard/verification")
		}
	}, [userInfo, router])

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

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(completeVerification)}
						className="space-y-3 mt-10"
					>
						<FormField
							control={form.control}
							name="primaryConsole"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel>Primary Console</FormLabel>
									<FormControl>
										<RadioGroup
											value={field.value}
											onChange={field.onChange}
											className="flex flex-wrap gap-3"
										>
											<Radio
												value="playstation"
												className="cursor-pointer px-10 py-5 border rounded-md inline-block data-[checked]:border-primary"
											>
												<span className="flex items-center gap-2">
													<IoLogoPlaystation /> PlayStation
												</span>
											</Radio>
											<Radio
												value="xbox"
												className="cursor-pointer px-10 py-5 border rounded-md inline-block data-[checked]:border-primary"
											>
												<span className="flex items-center gap-2">
													<IoLogoXbox /> XBox
												</span>
											</Radio>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							{primaryConsole === "playstation" && (
								<FormField
									control={form.control}
									name="psn"
									render={({ field }) => (
										<FormItem>
											<FormLabel>PSN</FormLabel>
											<FormControl>
												<Input
													value={field.value}
													onChange={field.onChange}
													placeholder="Enter your PSN"
													disabled
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							{primaryConsole === "xbox" && (
								<FormField
									control={form.control}
									name="gamertag"
									render={({ field }) => (
										<FormItem>
											<FormLabel>GamerTag</FormLabel>
											<FormControl>
												<Input
													value={field.value}
													onChange={field.onChange}
													disabled
													placeholder="Enter your Xbox Gamertag"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</div>

						<div>
							{primaryConsole === "playstation" && (
								<UnavailableError
									data={session?.connections?.ps}
									message="Looks like you don't have your playstation account connected to your discord account. Please connect that before proceeding to the next step"
								/>
							)}

							{primaryConsole === "xbox" && (
								<UnavailableError
									data={session?.connections?.xbox}
									message="Looks like you don't have your xbox account connected to your discord account. Please connect that before proceeding to the next step"
								/>
							)}

							{showButton && (
								<Button
									variant="secondary"
									type="button"
									onClick={() => update()}
								>
									I have connected
								</Button>
							)}
						</div>

						<FormField
							control={form.control}
							name="eaId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>EA ID</FormLabel>
									<FormControl>
										<Input
											value={field.value}
											onChange={field.onChange}
											placeholder="Enter your EA ID"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="birthday"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Birthday</FormLabel>
									<div>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] justify-start text-left font-normal",
														!field.value && "text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent align="start" className=" w-auto p-0">
												<Calendar
													mode="single"
													captionLayout="dropdown-buttons"
													selected={field.value}
													onSelect={field.onChange}
													fromYear={1900}
													toYear={2024}
												/>
											</PopoverContent>
										</Popover>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel>Gender</FormLabel>
									<FormControl>
										<RadioGroup
											value={field.value}
											onChange={field.onChange}
											className="flex flex-wrap gap-3"
										>
											<Radio
												value="male"
												className="cursor-pointer px-10 py-5 border rounded-md inline-block data-[checked]:border-primary"
											>
												👦 Male
											</Radio>
											<Radio
												value="female"
												className="cursor-pointer px-10 py-5 border rounded-md inline-block data-[checked]:border-primary"
											>
												👧 Female
											</Radio>
											<Radio
												value="unknown"
												className="cursor-pointer px-10 py-5 border rounded-md inline-block data-[checked]:border-primary"
											>
												🙊 Prefer Not To Say
											</Radio>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="jerseyNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Jersey Number</FormLabel>
									<FormControl>
										<Input
											value={field.value}
											onChange={(event) => field.onChange(event)}
											placeholder="Enter your jersey number (0-99)"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-5">
							<FormField
								control={form.control}
								name="primaryPosition"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Primary Position</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select prmiary position" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="left_wing">Left Wing</SelectItem>
												<SelectItem value="right_wing">Right Wing</SelectItem>
												<SelectItem value="left_defense">
													Left Defense
												</SelectItem>
												<SelectItem value="right_defense">
													Right Defense
												</SelectItem>
												<SelectItem value="center">Center</SelectItem>
												<SelectItem value="goalie">Goalie</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="secondaryPosition"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Secondary Position</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select secondary position" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="left_wing">Left Wing</SelectItem>
												<SelectItem value="right_wing">Right Wing</SelectItem>
												<SelectItem value="left_defense">
													Left Defense
												</SelectItem>
												<SelectItem value="right_defense">
													Right Defense
												</SelectItem>
												<SelectItem value="center">Center</SelectItem>
												<SelectItem value="goalie">Goalie</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input
											value={field.value}
											onChange={field.onChange}
											placeholder="What city and state are you in? (Province, Country, etc)"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="shootingHand"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel>What hand do you play with?</FormLabel>
									<FormControl>
										<RadioGroup
											value={field.value}
											onChange={field.onChange}
											className="flex flex-wrap gap-3"
										>
											<Radio
												value="left"
												className="cursor-pointer px-10 py-5 border rounded-md inline-block data-[checked]:border-primary"
											>
												🫷 Left
											</Radio>
											<Radio
												value="right"
												className="cursor-pointer px-10 py-5 border rounded-md inline-block data-[checked]:border-primary"
											>
												🫸 Right
											</Radio>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input
											value={field.value}
											onChange={field.onChange}
											placeholder="Enter your phone number. (optional)"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={isPending}>
							{isPending && <Loader2 className="mr-2 animate-spin" />}
							Complete Sign Up
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default SignUpPage

const UnavailableError = ({
	data,
	message,
}: { data?: string; message: string }) => {
	return data ? "" : <p className="text-yellow-500 text-sm my-2">⚠️ {message}</p>
}
