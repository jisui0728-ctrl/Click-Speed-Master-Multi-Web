import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // 서버 시작 시 자동으로 브라우저 열기
    port: 5173  // 포트 설정 (원하면 변경 가능)
  }
})
