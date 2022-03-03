import * as store from "./store.js";
import * as ui from "./ui.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";

let socketIO = null;

export const registerSocketEvents = (socket) => {
  socketIO = socket;

  socket.on("connect", () => {
    console.log("successfully connected to socket.io server");
    store.setSocketId(socket.id);
    ui.updatePersonalCode(socket.id);
  });

  socket.on("pre-offer-client-side", (data) => {
    console.log(data);
    webRTCHandler.handlePreOffer(data);
  });

  socket.on("pre-offer-answer-client-side", (data) => {
    webRTCHandler.handlePreOfferAnswer(data);
  });

  socket.on('webRTC-signaling-client-side', (data) => {
    console.log(data);
    switch (data.type) {
      case constants.webRtcSignaling.OFFER:
        webRTCHandler.handleWebRtcOffer(data);
        break;
      case constants.webRtcSignaling.ANSWER:
        webRTCHandler.handleWebRtcAnswer(data);
      break;
        // case constants.webRtcSignaling.ICE_CANDIDATE:
      default:
        return;
        
        // break;
    }
  });

};

export const sendPreOffer = (data) => {
  console.log("emmiting to server pre offer event");
  socketIO.emit("pre-offer", data);
};

export const sendPreOfferAnswer = (data) => {
  socketIO.emit("pre-offer-answer", data);
};
export const sendDataUsingWebRtcSignaling = (data)=>{
  socketIO.emit('webRTC-signaling', data);
};