import * as wss from "./wss.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";
import * as store from "./store.js";
let connectedUserDetails;
let peerConnection;
const configuration = {
      iceServer: [
            {
                  urls: 'stun:stun.1.google.com:13902'
            }
      ]
}
const defaultConstraints = {
      audio: true,
      video:true
};
export const getLocalPreview = () => {
      navigator.mediaDevices.getUserMedia(defaultConstraints).then((stream) => {
            ui.updateLocalVideo(stream);
            store.setLocalStream(stream);
      }).catch((err) => {
            console.log(err);
      });
};
export const sendPreOffer = (callType, calleePersonalCode) => {
  connectedUserDetails = {
    callType,
    socketId: calleePersonalCode,
  };

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    const data = {
      callType,
      calleePersonalCode,
    };
    ui.showCallingDialog(callingDialogRejectCallHandler);
    wss.sendPreOffer(data);
  }
};

export const handlePreOffer = (data) => {
  const { callType, callerSocketId } = data;

  connectedUserDetails = {
    socketId: callerSocketId,
    callType,
  };

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    console.log("showing call dialog");
    ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
  }
};

const acceptCallHandler = () => {
      console.log("call accepted");
  createPeerConnection();
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
  ui.showCallElements(connectedUserDetails.callType);
};

const rejectCallHandler = () => {
  console.log("call rejected");
  sendPreOfferAnswer();
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
};

const callingDialogRejectCallHandler = () => {
  console.log("rejecting the call");
};

const sendPreOfferAnswer = (preOfferAnswer) => {
  const data = {
    callerSocketId: connectedUserDetails.socketId,
    preOfferAnswer,
  };
  ui.removeAllDialogs();
  wss.sendPreOfferAnswer(data);
};

export const handlePreOfferAnswer = (data) => {
  const { preOfferAnswer } = data;

  ui.removeAllDialogs();

  if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
    ui.showInfoDialog(preOfferAnswer);
    // show dialog that callee has not been found
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
    ui.showInfoDialog(preOfferAnswer);
    // show dialog that callee is not able to connect
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
    ui.showInfoDialog(preOfferAnswer);
    // show dialog that call is rejected by the callee
  }

      if (preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED) {
            ui.showCallElements(connectedUserDetails.callType);
            createPeerConnection();
            // send webRTC offer
            sendWebRTCOffer();
      }
};

const createPeerConnection = () => {
      peerConnection = new RTCPeerConnection(configuration);
      peerConnection.onicecandidate = (event) => {
            console.log('got ice candidate from stun server');
            if (event.candidate) {
                  // send our ice candidate to other peer


            }
      };
      peerConnection.oniceconnectionstatechange = (event) => {
            if (peerConnection.connectionState === 'connected') {
                  console.log('peer rtc connected successfully with other peer');
            }
      };
      // ..receiving  tracks 
      const remoteStream = new MediaStream();
      store.setRemoteStream(remoteStream);
      ui.updateRemoteStream(remoteStream);
      peerConnection.ontrack = (event) => {
            remoteStream.addTrack(event.track);
      }

      //add stream to peer connection 
      if (connectedUserDetails.callType === constants.callType.VIDEO_PERSONAL_CODE) {
            const localStream = store.getState().localStream;
            for (const track of localStream.getTracks()) {
                  peerConnection.addTrack(track,localStream);
            }
      }
};

const sendWebRTCOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  wss.sendDataUsingWebRtcSignaling(
    {
      connectedUserSocketId: connectedUserDetails.socketId,
      type: constants.webRtcSignaling.OFFER,
      offer:offer
    }
  );

};
export const handleWebRtcOffer = async (data) => {
    await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  wss.sendDataUsingWebRtcSignaling({
    connectedUserSocketId:connectedUserDetails.socketId,
    type: constants.webRtcSignaling.ANSWER,
    answer:answer
  });
};
export const handleWebRtcAnswer = async (data) => {
  console.log(data);
  await peerConnection.setRemoteDescription(data.answer);

};

