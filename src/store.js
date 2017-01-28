const Vue = require('vue')
const Vuex = require('vuex')

Vue.use(Vuex)


const state = {
    localPath: ''
}

const mutations = {
    SET_LOCAL_PATH(state,value){
        state.localPath = value || ''
    }
}


module.exports = new Vuex.Store({ state, mutations })