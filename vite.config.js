import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            '~': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 3000,
        open: true, // auto mở browser
        // ✨ THÊM CẤU HÌNH NÀY để cho phép ngrok truy cập ✨
        allowedHosts: ['*.ngrok-free.app'], 
        // Lựa chọn thay thế: dùng 'all' nếu bạn muốn cho phép mọi host
        // allowedHosts: 'all',
    },
});
