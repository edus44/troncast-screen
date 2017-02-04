<template>
    <webview :src="src" :preload="preload"></webview>
</template>

<script>

import Debug from 'debug'
const levels = {
    '-1' : 'debug',
    '0' : 'log',
    '1' : 'warn',
    '2' : 'error'
}
const eventNames = [
    'close',
    // 'console-message',
    'crashed',
    'destroyed',
    'devtools-closed',
    'devtools-focused',
    'devtools-opened',
    // 'did-change-theme-color',
    'did-fail-load',
    // 'did-finish-load',
    // 'did-frame-finish-load',
    // 'did-get-redirect-request',
    // 'did-get-response-details',
    // 'did-navigate',
    // 'did-navigate-in-page',
    'did-start-loading',
    'did-stop-loading',
    'dom-ready',
    // 'enter-html-full-screen',
    // 'found-in-page',
    'gpu-crashed',
    // 'ipc-message',
    // 'leave-html-full-screen',
    // 'load-commit',
    'media-paused',
    'media-started-playing',
    // 'new-window',
    // 'page-favicon-updated',
    // 'page-title-updated',
    'plugin-crashed',
    // 'update-target-url',
    // 'will-navigate',
]

export default {
    props:['src','preload','position'],
    watch:{
        src(val){
            this.debug('updated-src',val)
        }
    },
    created(){
        this.debug = Debug('tc:channel-slot-webview:'+this.position)
        this.consoleDebug = Debug('tc:channel-slot-webview:'+this.position+':console')
        this.debug('src',this.src)
        this.debug('preload-src',this.preload)
    },
    mounted(){
        let el = this.$el

        //Forward console message
        el.addEventListener('console-message',(e)=>{
            this.consoleDebug(levels[e.level],e.message)
        })

        //Listen every desired webview event
        eventNames.forEach((eventName)=>{
            el.addEventListener(eventName,(e)=>{
                this.debug('event-'+eventName,e)
            })
        })

        el.addEventListener('dom-ready',()=>{
            el.openDevTools()
        })

        this.debug('webview-binded2')
    }
}
</script>

<style lang="less" scoped>
webview{
    flex:1;
    background-color: #fff;
}
</style>