<template>
    <section class="channel-slot-board" :class="{horizontal,reverse,mosaic}">
        <ChannelSlot
            v-for="(channel,index) in channels" 
            :channel="channel"
            :mosaic="mosaic"
        ></ChannelSlot>
    </section>
</template>

<script>

// const debug = require('debug')('tc:channel-slot-board')

import ChannelSlot from './ChannelSlot.vue'
import shortid  from 'shortid'

export default {
    data:()=>({
        channelsList:[
            'file:///home/eduardo.hidalgo/repo/own/troncast/screen/lib/demo_a.html',
            'file:///home/eduardo.hidalgo/repo/own/troncast/screen/lib/demo_a.html',
            // 'http://edus44.github.io',
            // 'http://status.bitbucket.com',
            // 'http://status.github.com',
            // 'http://meneame.net',
        ],
        horizontal: true,
        reverse: false,
        mosaic: true
    }),
    computed:{
        channels(){
            return this.channelsList.map((channel,idx)=>{
                let name = 'demo'

                return {
                    index: idx+1,
                    name:name,
                    src: channel,
                    id: idx+'-'+name+'-'+shortid.generate()
                }
            })
        }
    },
    components: {ChannelSlot}
}
</script>

<style lang="less">

section.channel-slot-board{
    flex:1;
    display: flex;
    flex-wrap: wrap;
    flex-direction:column;

    &.horizontal{
        flex-direction:row;
    }
    &.reverse{
        flex-wrap: wrap-reverse;
    }
    &.mosaic{
        .channel-slot{
            flex-basis:50%;
        }
    }
}

</style>