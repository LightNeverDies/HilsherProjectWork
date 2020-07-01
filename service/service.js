const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http')

const server = http.createServer();

server.listen(webSocketsServerPort);


function generateNumber(min,max){
    return Math.floor(
        Math.random() * (max-min +1) + min
    )
}

console.log(generateNumber(1,100))

const wsServer = new webSocketServer({
    httpServer:server
})

