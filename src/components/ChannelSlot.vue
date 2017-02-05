<template>
    <div class="channel-slot">
        <template v-if="channel">
            <WebviewWrapper 
                :src="srcFormal" 
                :preload="preloadSrc" 
                :position="position"
            ></WebviewWrapper>
            <div class="legend">
                <i>#{{ position }}</i><span>{{ channel.name }}</span>
            </div>
        </template>
        <div v-else class="message">
            <i>#{{ position }}</i>
            <p>Select a channel</p>
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
    // border-left:1px solid #aaa;
    // border-bottom:1px solid #aaa;
    flex-direction:column;

    .legend{
        position: absolute;
        opacity: .8;
        bottom:0;
        left:2rem;
        font-size: 1.4rem;
        
        i{
            padding:.5rem 1.4rem .2rem;
            background-color: #3273dc;
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
            background-color: #3273dc;
            font-size: 1.6rem;
        }
    }

    .message{
        font-size: 40px;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        display: flex;
        flex:1;

    }
}

</style>