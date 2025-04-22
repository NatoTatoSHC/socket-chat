var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var { Server } = require('socket.io');
var io = new Server(server);
var os = require('os')

var users = 0;
app.get('/', (req, res) => {
    res.sendFile(__dirname+"/client.html");
});
io.on('connection', (socket) => {
    console.log("a user connected");
    users += 1;
    io.emit('updCount', users);
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg);
    });
    socket.on('disconnect', () => {
        users -= 1;
        io.emit('updCount', users);
    });
});
server.listen(3000, () => {
    var address = server.address();
    console.log("listening on "+os.hostname+":"+address.port);
});