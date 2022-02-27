/*jshint esversion: 9 */
import * as store from './store.js';
import * as ui from './ui.js';
import * as webRtcHandler from './webRtcHandler.js';
let socketIO = null;
export const registerSocketEvents = (socket) => {
  socket.on('connect', () => {
    socketIO = socket;
        //send socket id to state management
        store.setSocketId(socket.id);
        //send user id to append
        ui.uiUpdatePersonalCode(socket.id);
  });    
  

  socket.on("pre-offer-client-side", (data) => {
    webRtcHandler.handlePreOffer(data);
  });
};

export const sendPreOffer = (data) => {
  console.log("emmiting to server pre offer event");
  socketIO.emit("pre-offer-server", data);
};