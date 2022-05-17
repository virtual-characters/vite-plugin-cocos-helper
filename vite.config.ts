import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import commonjsExternals from 'vite-plugin-commonjs-externals';

export default defineConfig({
    plugins: [
        dts(),
        // vite 构建 lib 包时需要特殊处理 node 模块，将其排出
        commonjsExternals({
            externals: ['os', 'path', 'fs', 'archiver', 'lodash/merge'],
        }),
    ],

    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'vitePluginCocosHelper',
            formats: ['cjs', 'es'],
            fileName: (format) => `[name].${format}.js`,
        },
    },
});
