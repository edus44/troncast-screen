import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
    localPath: ''
}

const mutations = {
    SET_LOCAL_PATH(state,value){
        state.localPath = value || ''
    }
}


export default new Vuex.Store({ state, mutations })