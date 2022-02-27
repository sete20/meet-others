import * as wss from './wss.js';
import * as constants from './constants.js';
import * as ui from './ui.js';
let connectedUserDetails ;
export const sendPreOffer = (calleePersonalCode, callType) => {
      connectedUserDetails= { calleePersonalCode, callType };
      if (callType === constants.callType.CHAT_PERSONAL_CODE || callType === constants.callType.VIDEO_PERSONAL_CODE) { 
            const data = { calleePersonalCode, callType };
            wss.sendPreOffer(data);
            ui.showCallingDialog(callingDialogRejectCallHandler,callType);
      }
};
export const handlePreOffer = (data) => {
      const { callType, callerPersonalCode } = data;
      connectedUserDetails = {
            socketId: callerPersonalCode,
            callType,
      }
      if (callType === constants.callType.CHAT_PERSONAL_CODE || callType === constants.callType.VIDEO_PERSONAL_CODE) {
           
                  ui.showIncomingCallDialog(callType,acceptCallHandler,rejectCallHandler);
            
      }
      // console.log('someone try to calling u with data ', data);
};
const acceptCallHandler = () => {
      
};
const rejectCallHandler = () => {
      
};
const callingDialogRejectCallHandler = () => {
      console.log('reject call');
};