/* eslint-disable strict,no-console*/

(function(window){
    'use strict'

    let [,slotId] = window.location.hash.match(/troncastChannelSlotId=(\d+)/)|| []

    window.TroncastChannel = {
        mine : true,
    }

    console.info('TroncastChannel loaded on slot '+slotId)
})(window)