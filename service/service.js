const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')
const socket = io(http,{path:'/test'})

const port = process.env.port || 8000;
const Str = require('@supercharge/strings')

function generateNumber(min,max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor((Math.random() * (max - min + 1))) + min
}

function generateString(){
    return Str.random()
}

socket.sockets.on('connection',(socket) =>{

    console.log(`A new user connected with [${socket.id}]`)

    socket.on('send_data', (data) =>{
        const {min, max} = data
        const result = generateNumber(min,max)
        const id = generateString()
        console.log(min,max)
        console.log(id)


        console.log(result)
    
        socket.emit('data_generate', {result : result , id : id})
    })

    
    socket.on('disconnect', () =>{
        console.log(`User disconnected with [${socket.id}]`)
    })
    
})


http.listen(port,() => console.log(`Listening to port ${port}`))
