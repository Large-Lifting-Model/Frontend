import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), eslint()],
	test: {
		globals: true,
		environment: 'jsdom', // Required for DOM APIs in React tests
		//setupFiles: './src/setupTests.js', // Optional setup file for global configurations
	  },
});
