import path from 'path';
import { defineConfig } from 'vite';
import cocosHelper from '../src/index';

export default defineConfig({
    plugins: [
        cocosHelper({
            zip: { fileName: 'inspector-example.zip' },
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: path.join(__dirname, './src/main.ts'),
                panel: path.join(__dirname, './src/panel/index.ts'),
            },
            output: {
                format: 'cjs',
            },
        },
    },
});
