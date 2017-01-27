<template>
    <section id="app">
        <HeaderBar></HeaderBar>
        <WebviewWrapper></WebviewWrapper>
    </section>
</template>

<script>

const HeaderBar = require('./HeaderBar.vue')
const WebviewWrapper = require('./WebviewWrapper.vue')

module.exports = {
    name: 'App',
    components :{HeaderBar,WebviewWrapper}
}
</script>


<style lang="less">

*,*:before, *:after {
    box-sizing: border-box;
}

body,html,#app{
    width: 100%;
    height: 100%;
    min-height: 100%;
    margin:0;
    padding:0;
    overflow: hidden;
    font-size: 10px;
}

section#app{
    display: flex;
    flex-direction : column;
    position: absolute;
    
    font-family: sans-serif;
    font-size: 2rem;
    background-color: #222;
    color:#eee;
}

</style>