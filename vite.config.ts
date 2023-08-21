import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'configure-response-headers',
			configureServer: (server) => {
				server.middlewares.use((_req, res, next) => {
					res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
					res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
					next();
				});
			}
		}
	],
	server: {
		host: true,
		port: 3001
	},
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib'),
			$components: path.resolve('./src/components'),
			$static: path.resolve('./static')
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	optimizeDeps: {
		// exclude: ['@sqlite.org/sqlite-wasm']
		exclude: ['sqlocal']
	}
});
