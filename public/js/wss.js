/*jshint esversion: 9 */
import * as store from './store.js';
import * as ui from './ui.js';
import * as webRtcHandler from './webRtcHandler.js';
let socketIo = null;
export const registerSocketEvents = (socket) => {
  socket.on('connect', () => {
    socketIo = socket;
        //send socket id to state management
        store.setSocketId(socket.id);
        //send user id to append
        ui.uiUpdatePersonalCode(socket.id);
  });    
  
  socket.on('pre-offer-client-side', (data) => {
    console.log(data);
    webRtcHandler.handlePreOffer(data);
  });
};
export const sendPreOffer = (data) => {
  socketIo.emit('pre-offer-server', data);
}