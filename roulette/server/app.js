require('./db');
const express = require('express');
let cors = require('cors');
const app = express();
app.use(cors());
const PORT = 9999;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = require('http').Server(app);
const io = require('socket.io')(server, {
    path: '/game/',
    origins: '*:*'
});
let count = 2;

io.on('connection', (socket) => {
    console.log('User Connected');
    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
    socket.on('timeAdd', (time) => {

        count = time;
        socket.broadcast.emit('timeout', count)
    });
});

const usersRoute = require('./route/users');

app.use('/auth/', usersRoute);

server.listen(PORT, () => {
    console.log(`Server listen on port: --> ${PORT}`);
});