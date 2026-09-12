import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
<<<<<<< HEAD
  base: '/kingstown-seafood/',
=======
  base: '/-kingstown_seafood/',
>>>>>>> dabfcf8293a52e6b41ca4f08fc6772dd57e4026b
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
