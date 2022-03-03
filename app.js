const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let connectedPeers = [];

io.on("connection", (socket) => {
  connectedPeers.push(socket.id);

  socket.on("pre-offer", (data) => {
    console.log("pre-offer-came");
    const { calleePersonalCode, callType } = data;
    // check if exists in users connected
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === calleePersonalCode
    );

     //if user exist 
    if (connectedPeers.includes(calleePersonalCode) && calleePersonalCode != socket.id) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };
      //emit to callee user if the caller exist
      io.to(calleePersonalCode).emit("pre-offer-client-side", data);
    } else {
      const data = {
        preOfferAnswer: "CALLEE_NOT_FOUND",
      };
      io.to(socket.id).emit("pre-offer-answer-client-side", data);
    }
  });

  socket.on("pre-offer-answer", (data) => {
    const { callerSocketId } = data;

    if (connectedPeers.includes(callerSocketId) && callerSocketId != socket.id) {
      io.to(data.callerSocketId).emit("pre-offer-answer-client-side", data);
    }
  });
  socket.on('webRTC-signaling', (data) => {
    const { connectedUserSocketId } = data;
    console.log('webrtc',connectedUserSocketId);
    if (connectedPeers.includes(connectedUserSocketId) && connectedUserSocketId != socket.id) {
      io.to(connectedUserSocketId).emit("webRTC-signaling-client-side", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    const newConnectedPeers = connectedPeers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );

    connectedPeers = newConnectedPeers;
    console.log(connectedPeers);
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
