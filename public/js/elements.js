


export const getIncomingCallDialog = (callTypeInfo, acceptCallHandler, rejectCallHandler) => {
      console.log('got incoming call');
      const dialog = document.createElement('div');
      dialog.classList.add('dialog_wrapper');
      const dialog_content = document.createElement('dive');
      dialog_content.classList.add('dialog_content');
      dialog.appendChild(dialog_content);
      const title = document.createElement('p');
      title.classList.add('dialog_title');
      title.innerHTML = `incoming ${callTypeInfo} call`;
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('dialog_image_container');
      const dialogHtml = document.getElementById('dialog');
      const image = document.createElement('img');
      const avatarImagePath = './utils/images/dialogAvatar.png';
      image.src = avatarImagePath;
      imageContainer.appendChild(image);
      const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("dialog_button_container");

  const acceptCallButton = document.createElement("button");
  acceptCallButton.classList.add("dialog_accept_call_button");
  const acceptCallImg = document.createElement("img");
  acceptCallImg.classList.add("dialog_button_image");
  const acceptCallImgPath = "./utils/images/acceptCall.png";
  acceptCallImg.src = acceptCallImgPath;
  acceptCallButton.append(acceptCallImg);
  buttonContainer.appendChild(acceptCallButton);

  const rejectCallButton = document.createElement("button");
  rejectCallButton.classList.add("dialog_reject_call_button");
  const rejectCallImg = document.createElement("img");
  rejectCallImg.classList.add("dialog_button_image");
  const rejectCallImgPath = "./utils/images/rejectCall.png";
  rejectCallImg.src = rejectCallImgPath;
  rejectCallButton.append(rejectCallImg);
  buttonContainer.appendChild(rejectCallButton);
      
      dialog_content.appendChild(title);
      dialog_content.appendChild(imageContainer);
      dialog_content.appendChild(buttonContainer);
      return dialog;

      // dialogHtml.appendChild(dialog);
};

export const getCallingDialog = (callingDialogRejectCallHandler,callTypeInfo) => {
      const dialog = document.createElement('div');
      dialog.classList.add('dialog_wrapper');
      const dialog_content = document.createElement('dive');
      dialog_content.classList.add('dialog_content');
      dialog.appendChild(dialog_content);
      const title = document.createElement('p');
      title.classList.add('dialog_title');
      title.innerHTML = `calling`; 
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('dialog_image_container');
      const dialogHtml = document.getElementById('dialog');
      const image = document.createElement('img');
      const avatarImagePath = './utils/images/dialogAvatar.png';
      image.src = avatarImagePath;
      imageContainer.appendChild(image);
      const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("dialog_button_container");


  const rejectCallButton = document.createElement("button");
  rejectCallButton.classList.add("dialog_reject_call_button");
  const rejectCallImg = document.createElement("img");
  rejectCallImg.classList.add("dialog_button_image");
  const rejectCallImgPath = "./utils/images/rejectCall.png";
  rejectCallImg.src = rejectCallImgPath;
  rejectCallButton.append(rejectCallImg);
  buttonContainer.appendChild(rejectCallButton);
      
      dialog_content.appendChild(title);
      dialog_content.appendChild(imageContainer);
      dialog_content.appendChild(buttonContainer);
      return dialog;

}