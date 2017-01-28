import Vue from 'vue'
import App from './components/App.vue'

import store from './store.js'

require('debug').enable('tc*')

new Vue({
    el: '#app',
    store,
    render: h=>h(App)
})