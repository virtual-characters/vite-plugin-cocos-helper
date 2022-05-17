import { name } from '../package.json';

/**
 * @en
 * @zh 为扩展的主进程的注册方法
 */
export const methods: Record<string, (...any: any) => any> = {
    openPanel() {
        Editor.Panel.open(name);
    },
};

/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
export function load() {}

/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
export function unload() {}

module.exports = {
    methods,
    load,
    unload,
};
