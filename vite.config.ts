import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  // Thay 'YOUR_REPOSITORY_NAME' bằng tên repository của bạn.
  // base: '/my-react-app/',
  plugins: [react()],
})
