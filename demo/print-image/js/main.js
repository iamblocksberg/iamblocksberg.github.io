/*
ref webcam: https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
ref webcam: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
ref print: https://htmldom.dev/print-an-image/
*/

// ##### Webcam ##### \\
// let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
let canvas_image = document.querySelector("#canvas_image");
let flipCamera = document.getElementById("flip-camera");

var stream;
var isFrontCam = false;

function getFacingMode() {
  return isFrontCam ? "user" : "environment";
}

var constraints = {
  video: { facingMode: getFacingMode() },
  audio: false,
};

// camera_button.addEventListener("click", async function () {
//   let stream = await navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: false,
//   });
//   video.srcObject = stream;
// });

async function runWebCam() {
  stream = await navigator.mediaDevices.getUserMedia(constraints);
  video.srcObject = stream;
}

flipCamera.onclick = function () {
  isFrontCam = !isFrontCam;
  constraints.video.facingMode = getFacingMode();
  console.log(isFrontCam, constraints);
  runWebCam();
};

click_button.addEventListener("click", function () {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas_image.src = canvas.toDataURL("image/jpeg");
  canvas_image.onload = () => {
    doPrint();
  };
  // let image_data_url = canvas.toDataURL("image/jpeg");

  // data url of the image
  // console.log(image_data_url);
});

window.onload = runWebCam();

// ##### Print ##### \\
// document.addEventListener("DOMContentLoaded", function () {
//   // Query the element
//   const printBtn = document.getElementById("print");

//   printBtn.addEventListener("click", function () {
//     // Create a fake iframe
//   });
// });
function doPrint() {
  const iframe = document.createElement("iframe");

  // Make it hidden
  iframe.style.height = 0;
  iframe.style.visibility = "hidden";
  iframe.style.width = 0;

  // Set the iframe's source
  iframe.setAttribute("srcdoc", "<html><body></body></html>");

  document.body.appendChild(iframe);

  iframe.contentWindow.addEventListener("afterprint", function () {
    iframe.parentNode.removeChild(iframe);
  });

  iframe.addEventListener("load", function () {
    // Clone the image
    // const image = document.getElementById("image").cloneNode();
    // const image = document.createElement("image");
    // image.src = canvas.toDataURL("image/jpeg");
    const image = canvas_image.cloneNode();
    image.style.maxWidth = "100%";

    // Append the image to the iframe's body
    const body = iframe.contentDocument.body;
    body.style.textAlign = "center";
    body.appendChild(image);
    console.log(image);

    iframe.contentWindow.print();
    // image.addEventListener("load", function () {
    //   // Invoke the print when the image is ready
    //   console.log("load print");
    //   iframe.contentWindow.print();
    // });
  });
}
