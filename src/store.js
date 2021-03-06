import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import socket from './socket'

const state = {
    localPath: '',
    remoteUri: '',
    channels: [],
    disposition:{
        horizontal: true,
        reverse: false,
        mosaic: true
    },
    // slots: [null,'status',null,'decisionator'],
    // slots: []
    slots: [null]
}

const mutations = {
    SET_LOCAL_PATH(state,value){
        state.localPath = value || ''
    },
    SET_REMOTE_URI(state,value){
        state.remoteUri = value || ''
    },
    SET_CHANNELS(state,value){
        state.channels = value && value.length ? value : []
    },
    REMOVE_SLOT(state,index){
        state.slots.splice(index,1)
    },
    ADD_SLOT(state){
        state.slots.push(null)
    },
    SELECT_CHANNEL(state,{channelId,index}){
        state.slots.splice(index,1,channelId)
    },
    TOGGLE_DISPOSITION(state,param){
        state.disposition[param] = !state.disposition[param]
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
    selectChannel({commit,dispatch},{channelId,position}){
        let index = position-1
        commit('SELECT_CHANNEL',{channelId,index})
        dispatch('sendSlots')
    },
    addSlot({commit,dispatch}){
        commit('ADD_SLOT')
        dispatch('sendSlots')
    },
    sendSlots({state}){
        socket.emit('remote:slots',state.slots)
    },
    sendDisposition({state}){
        socket.emit('remote:disposition',state.disposition)
    },
    requestData(){
        socket.emit('repository:request-list')
    }
}

let store = new Vuex.Store({ state, mutations, actions })

socket.on('repository:list',list=>{
    store.commit('SET_CHANNELS',list)
})
socket.on('remote:remove-slot',pointer=>{
    store.dispatch('removeSlot',pointer)
})
socket.on('remote:select-channel',pointer=>{
    store.dispatch('selectChannel',pointer)
})
socket.on('remote:add-slot',()=>{
    store.dispatch('addSlot')
})
socket.on('remote:request-slots',()=>{
    store.dispatch('sendSlots')
})
socket.on('remote:request-disposition',()=>{
    store.dispatch('sendDisposition')
})
socket.on('remote:toggle-disposition',(param)=>{
    store.commit('TOGGLE_DISPOSITION',param)
    store.dispatch('sendDisposition')
})

export default store 