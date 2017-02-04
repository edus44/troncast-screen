/* eslint-disable strict,no-console*/

(function(window){
    'use strict'

    // let [,slotId] = window.location.hash.match(/position=(\d+)/)|| []
    let params = new URLSearchParams(window.location.hash.slice(1))
    let channelId = params.get('id')
    let position = params.get('position')

    window.TroncastChannel = {
        mine : true,
    }
    console.info('TroncastChannel loaded on slot '+channelId+' '+position)
})(window)