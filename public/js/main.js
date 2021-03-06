import * as store from "./store.js";
import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";
import * as recordingUtils from "./recordingUtils.js";

// initialization of socketIO connection
const socket = io("/");
wss.registerSocketEvents(socket);
webRTCHandler.getLocalPreview();
//register event listener for personal code copy button
const personalCodeCopyButton = document.getElementById(
  "personal_code_copy_button"
);
personalCodeCopyButton.addEventListener("click", () => {
  const personalCode = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

// register event listeners for connection buttons

const personalCodeChatButton = document.getElementById(
  "personal_code_chat_button"
);

const personalCodeVideoButton = document.getElementById(
  "personal_code_video_button"
);

personalCodeChatButton.addEventListener("click", () => {
  console.log("chat button clicked");

  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.CHAT_PERSONAL_CODE;

  webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});

personalCodeVideoButton.addEventListener("click", () => {
  console.log("video button clicked");

  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.VIDEO_PERSONAL_CODE;

  webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});
const micButton = document.getElementById('mic_button');
micButton.addEventListener('click', () => {
  const localStream = store.getState().localStream;
  const micEnabled = localStream.getAudioTracks()[0].enabled;
  localStream.getAudioTracks()[0].enabled = !micEnabled;
  ui.updateMicButton(micEnabled);
});


const cameraButton = document.getElementById('camera_button');
cameraButton.addEventListener('click', () => {
  // get local stream from state management
  const localStream = store.getState().localStream;
  //get the video status true or false and send it to ui.updateCameraButton to change image as status
  const cameraEnabled = localStream.getVideoTracks()[0].enabled;
  localStream.getAudioTracks()[0].enabled = !cameraEnabled;
  ui.updateCameraButton(cameraEnabled);
});
const shareDesktopScreenButton = document.getElementById('screen_sharing_button');
shareDesktopScreenButton.addEventListener('click',()=> {
  var screenSharingActive = store.getState().screenSharingActive;
  webRTCHandler.switchBetweenCameraAndScreenSharing(screenSharingActive);
});
 //messenger

const newMessageInput = document.getElementById('new_message_input');
newMessageInput.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key === 'Enter') {
    ui.appendMessage(event.target.value, true);
    webRTCHandler.sendMessageUsingDataChannel(event.target.value);
    newMessageInput.value = '';
  }
});
const sendMessageButton = document.getElementById('send_message_button');
sendMessageButton.addEventListener('click', () => {
  const message = newMessageInput.value;
  webRTCHandler.sendMessageUsingDataChannel(message);
    ui.appendMessage(message, true);

    newMessageInput.value = '';

});
const startRecordingButton = document.getElementById('start_recording_button');
startRecordingButton.addEventListener('click', () => {
  recordingUtils.startRecording();
  ui.showRecordingPanel();
});
const stopRecordingButton = document.getElementById('stop_recording_button');
stopRecordingButton.addEventListener('click', () => {
  recordingUtils.stopRecording();
  ui.resetRecordingButtons();
});


const pauseButton = document.getElementById('pause_recording_button');
pauseButton.addEventListener('click', () => {
  recordingUtils.pauseRecording();
  ui.switchRecordingButtons(true);
});
const resumeButton = document.getElementById('resume_recording_button');
 resumeButton.addEventListener('click', () => {
  recordingUtils.resumeRecording();
  ui.switchRecordingButtons(false);
});