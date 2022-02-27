const express = require('express');
const http = require('http');
const { emit } = require('process');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'));
const server = http.createServer(app);
const io = require("socket.io")(server);
let connectedPeers = [];
app.get('/', (request, response) => {
      response.sendFile(__dirname + '/public/index.html');
      console.log('hello to home page');
});
server.listen(PORT, function(){
      console.log('hi  ' + PORT);
});
io.on('connection', function (socket) {
      
      
      if (connectedPeers.indexOf(socket.id)  == -1){
            connectedPeers.push(socket.id);
                console.log(connectedPeers);

      } else {
            console.log('the socket id '+  socket.id + ' is already part of the current online users');
      }

      socket.on('pre-offer-server', (data) => {
            const { calleePersonalCode, callType } = data;
                  // io.to(calleePersonalCode).emit('pre-offer-client-side',data);  
            //  && callerPersonalCode !== socket.id
            if (connectedPeers.includes(calleePersonalCode) && calleePersonalCode != socket.id) {
                  const data = {
                        callerPersonalCode: socket.id,
                        callType
                  };
                  io.to(calleePersonalCode).emit('pre-offer-client-side',data);  
            }
       

      });
      socket.on('disconnect', () =>{
          if (connectedPeers.indexOf(socket.id)  !== -1){
             connectedPeers =   connectedPeers.filter((socket_id) => {
                   socket_id !== socket.id;
                });
                console.log(connectedPeers);
      }
      });
});
