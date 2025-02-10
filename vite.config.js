import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    base: '/my-react-app/', // Đổi thành tên repo của bạn
});
