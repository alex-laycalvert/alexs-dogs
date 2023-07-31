import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		POSTGRES_PRISMA_URL: z.string().url(),
		POSTGRES_URL_NON_POOLING: z.string().url(),
		NODE_ENV: z.enum(["development", "test", "production"]),
		NEXTAUTH_SECRET:
			process.env.NODE_ENV === "production"
				? z.string().min(1)
				: z.string().min(1).optional(),
		NEXTAUTH_URL: z.preprocess(
			// This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
			// Since NextAuth.js automatically uses the VERCEL_URL if present.
			(str) => process.env.VERCEL_URL ?? str,
			// VERCEL_URL doesn't include `https` so it cant be validated as a URL
			process.env.VERCEL ? z.string().min(1) : z.string().url()
		),
		ADMIN_EMAIL: z.string().email(),
		GOOGLE_AUTH_CLIENT_ID: z.string().min(1),
		GOOGLE_AUTH_CLIENT_SECRET: z.string().min(1),
		S3_UPLOAD_KEY: z.string().min(1),
		S3_UPLOAD_SECRET: z.string().min(1),
		S3_UPLOAD_BUCKET: z.string().min(1),
		S3_UPLOAD_REGION: z.string().min(1),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		// NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
		POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
		NODE_ENV: process.env.NODE_ENV,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? 'john@example.com',
		GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID ?? 'x',
		GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? 'x',
		S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY ?? "AAAAAAAAAAAAAAA",
		S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET ?? "AAAAAAAAAAAAAAA",
		S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET ?? "name-of-bucket",
		S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION ?? "us-east-1",
	},
	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
	 * This is especially useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
