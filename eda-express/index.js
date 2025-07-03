const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const onlineUsers = new Map();
let chatsArray = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userName) => {
    onlineUsers.set(userName, socket.id);
    console.log(`User registered: ${userName} (${socket.id})`);

    io.emit("onlineUsers", Array.from(onlineUsers.entries()));
  });

  socket.on("sendMessage", ({ fromUserName, toSendName, sendMessageText }) => {
    chatsArray.push({ fromUserName, toSendName, sendMessageText });

    const toSocketId = onlineUsers.get(toSendName);
    if (toSocketId) {
      io.to(toSocketId).emit("newMessage", {
        fromUserName,
        toSendName,
        sendMessageText,
      });
    }

    socket.emit("newMessage", { fromUserName, toSendName, sendMessageText });
  });

  socket.on("disconnect", () => {
    for (let [userName, socketId] of onlineUsers) {
      if (socketId === socket.id) {
        onlineUsers.delete(userName);
        console.log(`User disconnected: ${userName} (${socket.id})`);
        break;
      }
    }

    io.emit("onlineUsers", Array.from(onlineUsers.entries()));
  });
});

server.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
