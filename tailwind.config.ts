import { type Config } from "tailwindcss";

export default {
	mode: "jit",
	darkMode: 'media',
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config;
