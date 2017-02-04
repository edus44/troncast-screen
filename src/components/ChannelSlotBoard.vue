<template>
    <section class="channel-slot-board" :class="{horizontal,reverse,mosaic}">
        <ChannelSlot
            v-for="channel,index in channelList" 
            :channel="channel"
            :position="index+1"
        ></ChannelSlot>
        <div v-if="!channelList.length">No slots</div>
    </section>
</template>

<script>

import ChannelSlot from './ChannelSlot.vue'

export default {
    data:()=>({
        horizontal: true,
        reverse: false,
        mosaic: true
    }),
    computed:{
        channelList(){
            let {state} = this.$store
            return state.slots.map(channelId=>{
                return state.channels.find(channel=>{
                    return channel.id == channelId
                })
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