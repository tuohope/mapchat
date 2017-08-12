/**
 * Created by Tuo on 2017/8/1.
 */
exports = module.exports = function(io){
    io.on('connection', function(socket) {
        console.log('new connection.');
        socket.on('disconnect', function() {
            console.log('discounncted');
        })
        socket.on('chat', function(data) {
            io.emit('chat broadcast', data);
            console.log(txt);
        })
    })
}