const Vue = require('vue')
const App = require('./components/App.vue')

require('debug').enable('tc*')

new Vue({
    el: '#app',
    render: h=>h(App)
})