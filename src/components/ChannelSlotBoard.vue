<template>
    <section class="channel-slot-board" :class="{horizontal,reverse,mosaic}">
        <ChannelSlot
            v-for="(channel,index) in channels" 
            :slotId="index+1" 
            :src="channel"
            :mosaic="mosaic"
        ></ChannelSlot>
    </section>
</template>

<script>

const debug = require('debug')('tc:channel-slot-board')

const ChannelSlot = require('./ChannelSlot.vue')

module.exports = {
    data:()=>({
        channels:[
            'file:///home/eduardo.hidalgo/repo/own/troncast/screen/lib/demo.html'
            // 'http://edus44.github.io',
            // 'http://status.bitbucket.com',
            // 'http://status.github.com',
            // 'http://meneame.net',
        ],
        horizontal: true,
        reverse: false,
        mosaic: true
    }),
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