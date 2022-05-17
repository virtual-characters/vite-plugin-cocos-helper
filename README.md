# vite-plugin-cocos-helper

cocos creator extensions vite 插件。

## 安装：

```bash
npm i vite-plugin-cocos-helper -D
yarn add vite-plugin-cocos-helper -D
pnpm add vite-plugin-cocos-helper -D
```

## 使用：

```ts
import path from 'path';
import { defineConfig } from 'vite';
import cocosHelper from 'vite-plugin-cocos-helper';

export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        cocosHelper({
            // 配置文件路径
            path: {
                // package.json 文件入口，可选默认 'package.json
                package: path.resolve(__dirname, 'package.json'),
                // i18n 文件加入口，可选默认 'i18n'
                i18n: path.resolve(__dirname, 'i18n'),
                // 静态文件入口，可选默认 'static'
                static: path.resolve(__dirname, 'static'),
            },
            // zip 配置
            zip: { fileName: 'xxx.zip' },
        }),
    ],
});
```

使用时在 package.json 直接配置**原始资源路径**，应用构建完成后插件会自动替换文件路径并在 `outDir` 生成对应的 `package.json`、`i18n` 与 `static` 文件：

```json
// 原始 package.json
{
    // 入口直接使用原始路径...
    "main": "app/main.ts",
    "module": "app/main.ts",
    "panels": {
        "default": {
            "title": "插件自定义面板",
            "type": "dockable",
            "main": "app/panel/index.ts",
            "icon": "static/icon.png"
        }
    }
}
```

输出结果：

```json
// 输出 package.json
{
    // ....
    "main": "main.js",
    "module": "main.js",
    "panels": {
        "default": {
            "title": "插件自定义面板",
            "type": "dockable",
            "main": "panel.js",
            "icon": "static/icon.png"
        }
    }
}
```

项目示例结构如下，最终插件的资源都会打包到 dist 目录中，dist 目录为最终插件的构建结果，在 creator 的插件管理面板导入整个 dist 即可：

```
.
├── dist
│   ├── assets
│   │   ├── main.7377688f.js
│   │   └── panel.27bb6927.js
│   ├── i18n
│   │   ├── en.js
│   │   └── zh.js
│   ├── package.json
│   └── static
│       └── icon.png
├── i18n
│   ├── en.js
│   └── zh.json
├── package.json
├── src
│   ├── index.d.ts
│   ├── main.ts
│   ├── panel
│   │   ├── index.ts
│   │   └── style.css
│   └── vite-env.d.ts
├── static
│   └── icon.png
├── tsconfig.json
└── vite.config.ts
```

## 配置项

接口定义与默认选项：

```ts
interface ICocosHelperOptions {
    path?: {
        // package.json 文件入口
        package?: string;
        // i18n 文件目录
        i18n?: string;
        // 静态文件目录
        static?: string;
    };
    zip?: {
        // 压缩文件名
        fileName?: string;
    };
}

const defaultOptions = {
    path: {
        package: 'package.json',
        i18n: 'i18n',
        static: 'static',
    },
    zip: null,
};
```

**path**

入口配置：
| 参数 | 类型 | 说明 |
| :------ | :-------------------------------- | :-------------------------------------------------------------------------------- |
| package | 可选 `string` | package.json 文件入口，默认为 package.json 即读取项目目录下的 package.json，package.json 文件入口可配置原始资源路径|
| i18n | 可选 `string` | i18n 配置文件目录，配置文件支持 js 与 json，json 文件最终会被转换成 cjs |
| static | 可选 `string` | 静态文件目录，用于放置插件配置图标，请避免与 [vite publicdir](https://vitejs.dev/config/#publicdir) 一致|

**zip**
打包配置，空置则不打包
| 参数 | 类型 | 说明 |
| :------ | :-------------------------------- | :-------------------------------------------------------------------------------- |
| fileName | 可选 `string` | 默认使用 package.json 中的 name 作为文件名 |
