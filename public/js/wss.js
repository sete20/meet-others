/*jshint esversion: 9 */
import * as store from './store.js';
import * as ui from './ui.js';
export const registerSocketEvents = (socket) => {
  socket.on('connect', () => {
      store.setSocketId(socket.id);
        ui.uiUpdatePersonalCode(socket.id);
});    
};