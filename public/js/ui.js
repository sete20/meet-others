/*jshint esversion: 9 */
import * as store from './store.js';
import * as constants from './constants.js';
import * as elements from './elements.js';

export const uiUpdatePersonalCode = (code) => {
      document.getElementById('personal_code_paragraph').innerHTML = code;
      
};
export const showIncomingCallDialog = (callType,acceptCallHandler,rejectCallHandler)=>{
      const callTypeInfo = callType === constants.typeType.CHAT_PERSONAL_CODE ? 'Chat' : 'video';
      const incomingCallDialog = elements.getIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);

};