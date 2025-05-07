"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { trpc } from "#/lib/providers/trpc-provider"

export function HomePage() {
	const { data: hello } = trpc.hello.useQuery()
	const { data: todos } = trpc.todo.getAll.useQuery()

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
				<h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
					Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
				</h1>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
					<div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
						<h3 className="text-2xl font-bold">First Steps →</h3>
						<div className="text-lg">
							Just the basics - Everything you need to know to set up your
							database and authentication.
						</div>
					</div>
					<div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
						<h3 className="text-2xl font-bold">Documentation →</h3>
						<div className="text-lg">
							Learn more about Create T3 App, the libraries it uses, and how to
							deploy it.
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center gap-2">
					<p className="text-2xl text-white">
						{hello ? hello.greeting : "Loading tRPC query..."}
					</p>
					<div className="flex flex-col items-center gap-2">
						<p className="text-2xl text-white">Todos:</p>
						<ul className="list-disc">
							{todos?.map((todo) => (
								<li key={todo.id} className="text-lg">
									{todo.title}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</main>
	)
}
