import * as wss from './wss.js';
import * as constants from './constants.js';
import * as ui from './ui.js';
let connectedUserDetails ;
export const sendPreOffer = (calleePersonalCode, callType) => {
      const data = { calleePersonalCode, callType };
      wss.sendPreOffer(data);
};
export const handlePreOffer = (data) => {
      const { callType, callerPersonalCode } = data;
      connectedUserDetails = {
            socketId: callerPersonalCode,
            callType,
      }
      if (callType === constants.typeType.CHAT_PERSONAL_CODE || callType === constants.typeType.VIDEO_PERSONAL_CODE) {
            ui.showIncomingCallDialog(callType,acceptCallHandler,rejectCallHandler);
      }
      // console.log('someone try to calling u with data ', data);
};
const acceptCallHandler = () => {
      
};
const rejectCallHandler = () => {
      
}
