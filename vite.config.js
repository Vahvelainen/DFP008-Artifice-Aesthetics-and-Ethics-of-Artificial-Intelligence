import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			// these are the aliases and paths to them
			'@lib': path.resolve('./src/lib'), //@lib might be build in for sveltekit now
			'@src': path.resolve('./src'),
			'@stores': path.resolve('./src/stores'),
			'@components': path.resolve('./src/lib/components'),
		},
	},
});
