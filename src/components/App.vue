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
        let localPath = new URLSearchParams(window.location.search).get('localPath')
        this.$store.commit('SET_LOCAL_PATH',localPath)
    },
    created(){
        this.$store.dispatch('requestData')
        this.$store.dispatch('sendSlots')
    }
}
</script>


<style lang="less">

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
    
    font-family: sans-serif;
    font-size: 2rem;
    background-color: #222;
    color:#eee;
}

</style>