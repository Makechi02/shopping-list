import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Shopping List',
                short_name: 'ShopList',
                description: 'A simple shopping list application',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: ({ request }) => request.destination === 'image',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images-cache',
                            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 7},
                        },
                    },
                    {
                        urlPattern: ({ request }) =>
                            request.destination === 'script' ||
                            request.destination === 'style',
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'assets-cache',
                            expiration: {maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 7},
                        },
                    },
                ],
            },
        })
    ]
})