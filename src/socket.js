
import io from 'socket.io-client'

const debug = require('debug')('tc:socket')
const socket = io('http://127.0.0.1:13370/screen')


//Debug socket io events
const eventNames = ['connect', 'error', 'disconnect','reconnecting']
eventNames.forEach((eventName)=>{
    socket.on(eventName, ()=>{
        debug('io',eventName)
    })
})

//Debug every event received
const onevent = socket.onevent
socket.onevent = function(packet){
    debug('event',packet.data[0],packet.data.slice(1))
    onevent.call(this,packet)
}


//Override emit 
const socketEmit = socket.emit.bind(socket)

socket.emit = (...args)=>{
    debug('emit',args)
    socketEmit(...args)
} 

export default socket