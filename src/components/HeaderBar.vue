<template>
    <section id="header-bar">
        <span class="title">Troncast</span>
        <span class="remote" v-if="remoteUri">
            Remote app on <b>{{remoteUri}}</b>
        </span>
    </section>
</template>

<script>
import {mapState} from 'vuex'

export default {
    computed:mapState(['remoteUri'])
}
</script>

<style lang="less">

section#header-bar{
    display: flex;
    align-items: center;
    padding:1rem 2rem;
    justify-content:space-around;
    .title{
        font-size: 3rem;
    }
    .remote{
        b{
            font-weight: normal;
        }
    }
}

</style>