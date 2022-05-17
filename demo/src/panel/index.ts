import style from './style.css?raw';

module.exports = Editor.Panel.define({
    template: `<div id="app"></div>`,
    style,
    $: {
        app: '#app',
    },
    methods: {},
    listeners: {
        show() {
            console.log('show');
        },
        hide() {
            console.log('hide');
        },
    },

    update() {
        console.log('update');
    },

    async ready() {
        if (!this.$.app) return;
        this.$.app.innerHTML = `<h1>Hello Cocos Plugin</h1>`;
    },

    close() {
        console.log('close');
    },
});
