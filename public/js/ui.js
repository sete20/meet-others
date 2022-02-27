/*jshint esversion: 9 */
import * as store from './store.js';
import * as constants from './constants.js';
import * as elements from './elements.js';

export const uiUpdatePersonalCode = (code) => {
      document.getElementById('personal_code_paragraph').innerHTML = code;
      
};
export const showIncomingCallDialog = (callType,acceptCallHandler,rejectCallHandler)=>{
      const callTypeInfo = callType === constants.callType.CHAT_PERSONAL_CODE ? 'Chat' : 'Video';
      const incomingCallDialog = elements.getIncomingCallDialog(callTypeInfo, acceptCallHandler, rejectCallHandler);
     
      const dialog = document.getElementById('dialog');
      dialog.querySelectorAll('*').forEach((dialog) => { dialog.remove() });
      dialog.appendChild(incomingCallDialog);
};
export const showCallingDialog = (callingDialogRejectCallHandler,callType) => {
      const callTypeInfo = callType === constants.callType.CHAT_PERSONAL_CODE ? 'Chat' : 'Video';
      const callingDialog = elements.getCallingDialog(callingDialogRejectCallHandler,callTypeInfo);
      const dialog = document.getElementById('dialog');
      dialog.querySelectorAll('*').forEach((dialog) => { dialog.remove() });
      dialog.appendChild(callingDialog);
};