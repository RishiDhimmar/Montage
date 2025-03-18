import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {

    port: 5175,
    proxy: {
      "/s3proxy": {
        target: "https://montage-data-dev.s3.us-west-1.amazonaws.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/s3proxy/, ""),
      },
    },

  }
})
