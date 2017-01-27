<template>
    <section id="webview-wrapper">
        <webview ref="webview" :src="src"></webview>
    </section>
</template>

<script>

const debug = require('debug')('tc:webview')
const channelDebug = require('debug')('tc:webview:console')
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
    'did-change-theme-color',
    'did-fail-load',
    'did-finish-load',
    'did-frame-finish-load',
    'did-get-redirect-request',
    // 'did-get-response-details',
    'did-navigate',
    'did-navigate-in-page',
    'did-start-loading',
    'did-stop-loading',
    'dom-ready',
    'enter-html-full-screen',
    'found-in-page',
    'gpu-crashed',
    'ipc-message',
    'leave-html-full-screen',
    'load-commit',
    'media-paused',
    'media-started-playing',
    'new-window',
    // 'page-favicon-updated',
    'page-title-updated',
    'plugin-crashed',
    // 'update-target-url',
    'will-navigate',
]

module.exports = {
    data:()=>({
        src:'http://status.github.com'
    }),
    watch:{
        src(val){
            debug('src',val)
        }
    },
    mounted(){


        debug('mounted')

        let wv = this.$refs.webview

        wv.addEventListener('console-message',(e)=>{
            channelDebug(levels[e.level],e.message)
        })

        eventNames.forEach((eventName)=>{
            wv.addEventListener(eventName,(e)=>{
                debug('event-'+eventName)
            })
        })

    }
}
</script>

<style lang="less">

section#webview-wrapper{
    flex:1;
    display: flex;

    webview{
        flex:1;
        background-color: #fff;
    }
}

</style>