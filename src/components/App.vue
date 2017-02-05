<template>
    <section class="app">
        <HeaderBar></HeaderBar>
        <ChannelSlotBoard></ChannelSlotBoard>
    </section>
</template>

<script>

import HeaderBar from './HeaderBar.vue'
import ChannelSlotBoard from './ChannelSlotBoard.vue'

export default {
    name: 'App',
    components :{HeaderBar,ChannelSlotBoard},
    beforeCreate(){
        let params = new URLSearchParams(window.location.search)
        let localPath = params.get('localPath')
        let remoteUri = params.get('remoteUri')
        this.$store.commit('SET_LOCAL_PATH',localPath)
        this.$store.commit('SET_REMOTE_URI',remoteUri)
    },
    created(){
        this.$store.dispatch('requestData')
        this.$store.dispatch('sendSlots')
    }
}
</script>


<style lang="less">
@import '../assets/fonts';

*,*:before, *:after {
    box-sizing: border-box;
}

body,html,section.app{
    width: 100%;
    height: 100%;
    min-height: 100%;
    margin:0;
    padding:0;
    overflow: hidden;
    font-size: 10px;
}

section.app{
    display: flex;
    flex-direction : column;
    position: absolute;
    
    font-family: 'Open Sans',sans-serif;
    font-weight: 300;
    font-size: 2rem;
    background-color: #3273dc;
    color:white;
}

</style>