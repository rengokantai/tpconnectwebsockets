/**
 * Created by Hernan Y.Ke on 2015/9/11.
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//app.get('/',function(req,res){
//    res.send("x");
//});

var messages = [{
    userId:1,
    messageId:10,
    userName:"Tom",
    content:{
        text:"text1",
        link:"http://xxx.com"
    },
    likedBy:[1],
    ts:Date.now()-10000
},
    {
        userId:2,
        messageId:11,
        userName:"Tom",
        content:{
            text:"text1",
            link:"http://xxx.com"
        },
        likedBy:[2,3],
        ts:Date.now()-100000
    }]

app.use(express.static('app'))
app.use('/bower_components',express.static('bower_components'));

io.on('connection',function(socket){
    socket.emit('messages',messages);
    socket.on('new-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages',messages);
    });

    socket.on('update-message', function (data) {

        var message = messages.filter(function(a){
            return a.messageId == data.messageId;
        })[0];

        message.likedBy = data.likedBy;
        io.sockets.emit('messages',messages);
    });
})

server.listen(80);
