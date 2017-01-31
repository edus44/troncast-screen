import Vue from 'vue'
import App from './components/App.vue'

import store from './store.js'

require('debug').enable('tc*')

new Vue({
    el: '#app',
    store,
    render: h=>h(App)
})

import io from 'socket.io-client'
const socket = io('http://127.0.0.1:13370/screen')

socket.on('remote:hello',()=>{
    console.info('gotcha')
    socket.emit('remote:hello-back')
})

socket.on('connect',()=>{
    console.info('sent')
    socket.emit('remote:hello-back',{initia:true})
})