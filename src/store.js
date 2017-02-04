import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import socket from './socket'

const state = {
    localPath: '',
    channels: [],
    slots: [null,'status',null,'decisionator'],
}

const mutations = {
    SET_LOCAL_PATH(state,value){
        state.localPath = value || ''
    },
    SET_CHANNELS(state,value){
        state.channels = value && value.length ? value : []
    },
    REMOVE_SLOT(state,index){
        state.slots.splice(index,1)
    },
    ADD_SLOT(state){
        state.slots.push(null)
    }
}


const actions = {
    removeSlot({commit,state,dispatch},{channelId,position}){
        let index = position-1
        if (state.slots[index] === channelId){
            commit('REMOVE_SLOT',index)
            dispatch('sendSlots')
        }else{
            throw new Error('Invalid slot to remove '+channelId+position)
        }
    },
    addSlot({commit,dispatch}){
        commit('ADD_SLOT')
        dispatch('sendSlots')
    },
    sendSlots({state}){
        socket.emit('remote:slots',state.slots)
    },
    requestData(){
        socket.emit('repository:request-list')
    }
}

let store = new Vuex.Store({ state, mutations, actions })

socket.on('repository:list',list=>{
    store.commit('SET_CHANNELS',list)
})
socket.on('remote:remove-slot',payload=>{
    store.dispatch('removeSlot',payload)
})
socket.on('remote:add-slot',()=>{
    store.dispatch('addSlot')
})
socket.on('remote:request-slots',()=>{
    store.dispatch('sendSlots')
})



export default store 