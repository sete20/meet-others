import * as store from './store.js';


let mediaRecorder;
let recordedChunks = [];
const vp9Codec = 'video/webm; codecs=vp=9';
const vp9Options = { mimeType: vp9Codec };
export const startRecording = () => {
      const remoteStream = store.getState().remoteStream;
      // MediaRecorder to check if the browser support this type of media recording
      if (MediaRecorder.isTypeSupported(vp9Codec)) {
            mediaRecorder = new MediaRecorder(remoteStream, vp9Options);
      } else {
            mediaRecorder = new MediaRecorder(remoteStream);
      }
      mediaRecorder.ondataavailable = handleDataAvailable;
       mediaRecorder.start();
}


export const pauseRecording = () => {
      mediaRecorder.pause();
}


export const resumeRecording = () => {
      mediaRecorder.resume()    
}

export const stopRecording = () => {
  mediaRecorder.stop();
};

const handleDataAvailable = (event) => {
      if (event.data.size > 0) {
            recordedChunks.push(event.data);
            downloadRecordedVideo();
      }
}
export const downloadRecordedVideo = () => {
      const blob = new Blob(recordedChunks, {
         type:'video/webm'
      });
     const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display:none;';
      a.href = url;
      a.download = 'recording.webm';
      a.click();
      window.URL.revokeObjectURL(url);
}