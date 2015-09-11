/**
 * Created by Hernan Y.Ke on 2015/9/11.
 */

"use strict";

var userId = localStorage.getItem("userId") || randomId();
localStorage.setItem("userId", userId);

function randomId() {
    return Math.floor(Math.random() * 1e12);
}

var messagesCache;
var socket = io.connect('http://localhost', { 'forceNew': true });
socket.on('messages', function (data) {
    messagesCache = data;
    render();
    message.value = "";
    linkAddress.value = "";
});

function render() {
    var html = messagesCache.sort(function (a, b) {
        return a.ts - b.ts;
    }).map(function (data, index) {
        return "\n      <form class=message onsubmit=\"return likeMessage(messagesCache[" + index + "])\">\n        <div class='name'>\n          " + data.userName + ":\n        </div>\n        <a href=" + data.content.link + " class='message' target=blank>\n          " + data.content.text + "</a>\n        <div class='time'>\n           " + moment(data.ts).fromNow() + "\n        </div>\n        <input type=submit class='likes-count' value=\"" + data.likedBy.length + " Hearts\">\n\n        </button>\n      </form>\n    ";
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

function likeMessage(message) {

    var index = message.likedBy.indexOf(userId);
    if (index < 0) {
        message.likedBy.push(userId);
    } else {
        message.likedBy.splice(index, 1);
    }

    socket.emit("update-message", message);
    render();
    return false;
}

function addMessage(e) {
    var payload = {
        userName: document.getElementById("username").value,
        content: {
            text: document.getElementById("message").value,
            link: document.getElementById("linkAddress").value
        },
        messageId: randomId(),
        userId: userId,
        likedBy: [],
        ts: Date.now()
    };

    socket.emit("new-message", payload);
    return false;
}