function Sockets(app, io) {
    io.on('connection', function(socket) {
        console.log('a user socket connected');

        socket.on('comment added', function(data) {
            console.log('data : ' + JSON.stringify(data));
            socket.broadcast.emit("notify everyone",{user : data.user,comment : data.comment});
        });

        socket.on('disconnect', function() {
            console.log(socket.id + ' is disconnected');
        })
    });
}

module.exports = Sockets;