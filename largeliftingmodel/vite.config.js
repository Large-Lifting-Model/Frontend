import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const isDev = mode === "development";
	return {
		plugins: [react(), eslint()],
		base: isDev ? "/" : "/frontend/",
		build: {
			outDir: "dist",
			assetsDir: "assets",
		},
		server: {
			headers: {
				"Cross-Origin-Opener-Policy": "same-origin-allow-popups", // Allow window interactions
			},
		},
		test: {
			globals: true,
			environment: "jsdom", // Required for DOM APIs in React tests
			//setupFiles: './src/setupTests.js', // Optional setup file for global configurations
		},
	};
});
