<template>
    <div class="channel-slot">
        <WebviewWrapper 
            v-if="channel" 
            :src="srcFormal" 
            :preload="preloadSrc" 
            :position="position"
        ></WebviewWrapper>
        <p v-else>No channel selected</p>
        <div class="legend">
            <b>#{{ position }}</b><span v-if="channel">{{ channel.name }}</span>
        </div>
    </div>
</template>

<script>
import WebviewWrapper from './WebviewWrapper.vue'

export default {
    components:{WebviewWrapper},
    props:['channel','position'],
    computed:{
        preloadSrc(){
            return 'file://' + this.$store.state.localPath + '/lib/TroncastChannel.js'
        },
        srcFormal(){
            return this.channel && this.channel.entry+'#?id='+this.channel.id+'&position='+this.position
        }
    },
    watch:{
        src(val){
            this.debug('updated-src',val)
        }
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

    .legend{
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