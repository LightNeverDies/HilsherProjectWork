const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')
const socket = io(http,{path:'/test'})

const port = process.env.port || 8000;

function generateNumber(min,max){
    return Math.ceil((Math.random() * (max-min+1)) + min)
}

function generateString(){
    
}

socket.sockets.on('connection',(socket) =>{

    console.log(`A new user connected with [${socket.id}]`)

    socket.on('send_data', (data) =>{
        const {min, max} = data
        const result = generateNumber(min,max)
        console.log(min,max)


        console.log(result)
    
        socket.emit('data_generate', result)
    })

    
    socket.on('disconnect', () =>{
        console.log(`User disconnected with [${socket.id}]`)
    })
    
})


http.listen(port,() => console.log(`Listening to port ${port}`))
