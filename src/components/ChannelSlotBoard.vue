<template>
    <section class="channel-slot-board" :class="{
        horizontal: disposition.horizontal,
        reverse: disposition.reverse,
        mosaic: disposition.mosaic
    }">
        <ChannelSlot
            v-for="channel,index in channelList" 
            :channel="channel"
            :position="index+1"
        ></ChannelSlot>
        <div class="message" v-if="!channelList.length">
            <span>Add some slots</span>
        </div>
    </section>
</template>

<script>

import ChannelSlot from './ChannelSlot.vue'

export default {
    computed:{
        channelList(){
            let {state} = this.$store
            return state.slots.map(channelId=>{
                return state.channels.find(channel=>{
                    return channel.id == channelId
                })
            })
        },
        disposition(){
            return this.$store.state.disposition
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
    .message{
        font-size: 40px;
        justify-content:center;
        align-items:center;
        display: flex;
        flex:1;

    }
}

</style>