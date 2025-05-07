"use client"

import type { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { createTRPCReact } from "@trpc/react-query"
import { httpBatchLink } from "@trpc/client"
import { useState } from "react"
import superjson from "superjson"
import { makeQueryClient } from "#/lib/query-client"
import type { AppRouter } from "#/server/routers/_app"

const trpc = createTRPCReact<AppRouter>()

let clientQueryClientSingleton: QueryClient
function getQueryClient() {
	if (typeof window === "undefined") {
		// Server: always make a new query client
		return makeQueryClient()
	}
	// Browser: use singleton pattern to keep the same query client
	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	return (clientQueryClientSingleton ??= makeQueryClient())
}

function getUrl() {
	const base = (() => {
		if (typeof window !== "undefined") return ""
		if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
		return `http://localhost:${process.env.PORT ?? 3000}`
	})()
	return `${base}/api/trpc`
}

export function TRPCProvider(
	props: Readonly<{
		children: React.ReactNode
	}>,
) {
	const [queryClient] = useState(() => getQueryClient())
	const [trpcClient] = useState(() => trpc.createClient({
		links: [
			httpBatchLink({
				url: getUrl(),
				headers: () => {
					const newHeaders = new Headers()
					newHeaders.set("x-trpc-source", "nextjs-react")
					return Object.fromEntries(newHeaders)
				},
				transformer: superjson,
			}),
		],
	}))

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{props.children}
			</QueryClientProvider>
		</trpc.Provider>
	)
}

export { trpc }
