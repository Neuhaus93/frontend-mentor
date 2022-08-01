import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config: ReturnType<typeof defineConfig> = {
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  }

  if (command === "build") {
    config.base = "/frontend-mentor/expense-chart-component/dist/";
  }

  return config;
})
