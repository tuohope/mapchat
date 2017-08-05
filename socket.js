/**
 * Created by Tuo on 2017/8/1.
 */
exports = module.exports = function(io){
    console.log(123123);

    io.on('connection', function(socket) {
        console.log('new connection.');
        socket.on('disconnect', function() {
            console.log('discounncted');
        })
        socket.on('chat', function(txt) {
            io.emit('chat broadcast', txt);
            console.log(txt);
        })
    })
}