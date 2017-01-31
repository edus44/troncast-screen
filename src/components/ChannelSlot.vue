<template>
    <div class="channel-slot">
        <webview ref="webview" :src="srcFormal" :preload="preloadSrc"></webview>
        <div><b>#{{ channel.index }}</b><span>{{ channel.id }}</span></div>
    </div>
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
    props:['channel'],
    computed:{
        preloadSrc(){
            return 'file://' + this.$store.state.localPath + '/lib/TroncastChannel.js'
        },
        srcFormal(){
            return this.channel.src+'#troncastChannelSlotId='+this.channel.id
        }
    },
    watch:{
        src(val){
            this.debug('updated-src',val)
        }
    },
    created(){
        this.debug = Debug('tc:channel-slot:'+this.channel.id)
        this.consoleDebug = Debug('tc:channel-slot:'+this.channel.id+':console')
        this.debug('src',this.src)
        this.debug('preload-src',this.preloadSrc)
    },
    mounted(){
        let wv = this.$refs.webview

        //Forward console message
        wv.addEventListener('console-message',(e)=>{
            this.consoleDebug(levels[e.level],e.message)
        })

        //Listen every desired webview event
        eventNames.forEach((eventName)=>{
            wv.addEventListener(eventName,()=>{
                this.debug('event-'+eventName)
            })
        })

        wv.addEventListener('dom-ready',()=>{
            // wv.openDevTools()
        })

        this.debug('webview-binded')
    }
}
</script>

<style lang="less">

.channel-slot{
    flex:1;
    display: flex;
    position: relative;
    border-left:1px solid #aaa;
    border-bottom:1px solid #aaa;
    flex-direction:column;

    webview{
        flex:1;
        background-color: #fff;
    }
    div{
        position: absolute;

        bottom:0;
        left:2rem;
        font-size: 1.4rem;
        font-weight: bold;
        text-shadow:1px 1px 1px rgba(0,0,0,.3);
        b{
            padding:.5rem 1.4rem .2rem;
            background-color: rgba(0,0,0,0.5);
            vertical-align: bottom;
            font-size: 3rem;
            display: inline-block;
            border-radius: 4px 4px 0 0;
        }
        span{
            padding: .5rem 1rem .5rem .5rem;
            border-radius: 0 4px 0 0;
            vertical-align: bottom;
            display: inline-block;
            background-color: rgba(0,0,0,0.5);
            font-size: 1.4rem;
        }
    }
}

</style>