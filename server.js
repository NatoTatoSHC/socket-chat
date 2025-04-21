var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var { Server } = require('socket.io');
var io = new Server(server);
var os = require('os')

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/client.html");
});
io.on('connection', (socket) => {
    console.log("a user connected");
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg);
    });
});
server.listen(3000, () => {
    var address = server.address();
    console.log("listening on "+os.hostname+":"+address.port);
});