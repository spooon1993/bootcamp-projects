const PORT = 9988;
const PORT_Heroku = process.env.PORT;
console.log(PORT_Heroku);
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server, {
    path: '/chat/',
    origins: "*:*"
});

let online = 0;
io.on('connection', (client) => {
    console.log("User connected");
    console.log(++online);
    client.broadcast.emit("change-online", online);
    client.on("disconnect", () => {
        console.log(--online);
        client.broadcast.emit("change-online", online);
    });
    client.on("message", (message) => {
        console.log(message);
        client.broadcast.emit("new-message", message);
    });
    client.on("typing", (is) => {
        client.broadcast.emit("somebody-typing", is);
    })
});

app.use(express.static('./build'));
server.listen(PORT_Heroku || PORT, () => {
    console.log(`Server is started on port №${PORT}`);
});
