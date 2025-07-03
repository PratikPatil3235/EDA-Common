const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("register", (userName) => {
    onlineUsers.set(userName, socket.id);
    console.log("user Registered with ", userName, socket.id);
     socket.emit("onlineUsers",Array.from(onlineUsers.entries()));
  });

 
  socket.on("disconnect", () => {
    for (let [userName, socketId] of onlineUsers) {
      // console.log(userName,socketId);
      if (socketId == socket.id) {
        onlineUsers.delete(userName);
      }
      console.log(
        `user with socket id ${socket.id} and name${userName} got disconnected`
      );
    }
  });
});

server.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
