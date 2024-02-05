import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

const base = process.env.NODE_ENV == 'development'
              ?''
              :'/react-news-app/'

export default defineConfig({
  plugins: [react()],
  base,
})
