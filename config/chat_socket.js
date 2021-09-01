const Friendship = require('../models/friendship');


module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
        socket.on('disconnect',function()
        {
            console.log('Connection disconnected');
        });


        socket.on('joinroom',function(data)
        {
            console.log('joining request recived',data);
            socket.join(data.chatRoom);

            io.in(data.chatRoom).emit('user-joined',data);

        });

        socket.on('send_message',function(data){
            console.log("server is listening for data", data);
            io.in(data.chatRoom).emit('receive_message', data);

        })
    });

}