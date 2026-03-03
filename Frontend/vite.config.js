import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Isso força o Vite a ignorar o cache de dependências antigo
    force: true 
  }
})