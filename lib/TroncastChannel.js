/* eslint-disable strict,no-console*/
(function(window){
    'use strict'

    function isGenerator(fn) {
        return fn.constructor.name === 'GeneratorFunction'
    }

    //Debug options
    const Debug = require('debug')
    Debug.enable('tc*')
    const debug = Debug('tc:channel')
    debug('init')

    //Descriptions
    let channelId
    let position
    let customPreload
    let ready = false
    let readyFn

    //Listen for channel description
    const { ipcRenderer } = require('electron')   
    ipcRenderer.on('channelDescription', (e, description) => {
        debug('pointer', description.position, description.channelId)

        //Save description
        channelId = description.channelId
        position = description.position
        customPreload = description.customPreload

        //Custom preload
        if (customPreload){
            debug('custom-preload',customPreload)
            try{
                require(customPreload)
            }catch(e){
                debug('error-with-preload',e)
            }
        }
        ready = true
        if (typeof readyFn == 'function')
            readyFn()
    })


    //Socket.io connection
    const io = require('socket.io-client')
    const socket = io('http://127.0.0.1:13370/channel')

    // Filters broadcasted event based on channel pointer
    const onevent = socket.onevent
    const eventTypes = ['event','broadcast-event','discarded-event']
    socket.onevent = function(packet){

        let pointer = packet.data[1]
        let eventType = 0

        //Match pointer
        if (pointer && pointer.channelId == channelId && pointer.position == position){
            // Strips valid pointer from payload
            packet.data.splice(1,1)
        }else{
            if (!pointer){
                //Broadcast (no pointer)
                eventType = 1
                packet.data[0] = 'broadcast:'+packet.data[0]
            }else{
                //Discarded (invalid pointer)
                eventType = 2
            }
        }

        //Debug line
        debug(eventTypes[eventType],packet.data[0],packet.data.slice(1))

        //If not discarded, call listeners
        if (eventType!=2){
            onevent.call(this,packet)
        }
    }

    //Watch for configure request
    socket.on('remote:configure',runSequence)
    socket.on('remote:request-configure-form',sendForm)
    socket.on('broadcast:remote:request-configure-form',sendForm)

    //Sequence iterator variables
    let sequenceFn = null
    let iterator = null
    let yielded = null

    //Run sequence generator iterator (REPL)
    function runSequence(result){

        //Reuse iterator o start new one
        if (!yielded || yielded.done){
            debug('sequence-start')
            iterator = sequenceFn()
        }else{
            debug('sequence-result',result)
        }

        //Get next value
        yielded = iterator.next(result)
        debug('sequence-yielded',yielded)
        sendForm()
    }

    //Send the last yielded form back to remote
    function sendForm(){
        let form = yielded && yielded.value || null
        debug('send-form',form)
        socket.emit('remote:configure-form',{channelId,position},form)
    }

    //Exposed object
    window.TroncastChannel = {

        onConfigure(fn){
            if (!isGenerator(fn)){
                throw new Error('TroncastChannel - Configure sequence need to be a generator function')
            }
            sequenceFn = fn
        },
        onReady(fn){
            if (ready){
                fn()
            } else {
                readyFn = fn
            }
        },
        openDevTools(){
            ipcRenderer.sendToHost('openDevTools')
        },
        closeDevTools(){
            ipcRenderer.sendToHost('closeDevTools')
        }
    }

    console.info(`TroncastChannel loaded`)

})(window)