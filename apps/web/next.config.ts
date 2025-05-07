import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	transpilePackages: ["@repo/ui", "@repo/db"],
	experimental: {
		reactCompiler: true,
	},
	webpack: config => {
		config.externals.push("pino-pretty", "lokijs", "encoding")
		return config
	},
	env: {
		"DATABASE_URL": "postgresql://postgres:postgres@localhost:5433/postgres"
	},
	output: "standalone",
}

export default nextConfig
