import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  base: process.env.VITE_BASE_PATH || '/Bvcattendancetracker', 
})
