<template>
    <div>
        works great
    </div>
</template>

<script>
module.exports = {
    name: 'App',
    created(){
        const {ipcRenderer} = window.require('electron')

        console.log('hey',ipcRenderer);
    }
}
</script>