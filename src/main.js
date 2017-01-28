const Vue = require('vue')
const App = require('./components/App.vue')

const store = require('./store.js')

require('debug').enable('tc*')

new Vue({
    el: '#app',
    store,
    render: h=>h(App)
})