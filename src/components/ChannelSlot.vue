<template>
    <div class="channel-slot">
        <span>#{{ slotId }}</span>
        <webview ref="webview" :src="srcFormal" :preload="preloadSrc"></webview>
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
    props:['slotId','src'],
    computed:{
        preloadSrc(){
            return 'file://' + this.$store.state.localPath + '/lib/TroncastChannel.js'
        },
        srcFormal(){
            return this.src+'#troncastChannelSlotId='+this.slotId
        }
    },
    watch:{
        src(val){
            this.debug('updated-src',val)
        }
    },
    created(){
        this.debug = Debug('tc:channel-slot:'+this.slotId)
        this.consoleDebug = Debug('tc:channel-slot:'+this.slotId+':console')
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

    webview{
        flex:1;
        background-color: #fff;
    }
    span{
        position: absolute;
        background-color: #333;
        padding:.5rem;
        font-size: 1.4rem;
        border-radius: 4px;
        opacity: .8;
        right: 3rem;
        top: 1rem;
        font-weight: bold;
    }
}

</style>