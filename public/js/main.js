import * as store from './store.js';
import * as wws from './wss.js';
import * as constants from './constants.js';
import * as webRtcHandler from './webRtcHandler.js';

// send socket to wss file to handle the events
const socket = io('/');
wws.registerSocketEvents(socket);

// personal code copy button event
const personalCodeCopyButton = document.getElementById('personal_code_copy_button');
personalCodeCopyButton.addEventListener('click', () => {
      const personalCode = store.getState().socketId;
      navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

// personal code chat button event
const personalCodeChatButton = document.getElementById('personal_code_chat_button');
personalCodeChatButton.addEventListener('click', () => {
      const calleePersonalCode = document.getElementById('personal_code_input').value;
      if (calleePersonalCode.length > 8) {
            
            const callType = constants.typeType.CHAT_PERSONAL_CODE;
            webRtcHandler.sendPreOffer(calleePersonalCode,callType);
      }
      
});


// personal code video button event
const personalVideoChatButton = document.getElementById('personal_code_video_button');
personalVideoChatButton.addEventListener('click', () => {
      const calleePersonalCode = document.getElementById('personal_code_input').value;
       if (calleePersonalCode.length > 8 ) {
            
             const callType = constants.typeType.VIDEO_PERSONAL_CODE;
       
             webRtcHandler.sendPreOffer(calleePersonalCode,callType);
      }
});