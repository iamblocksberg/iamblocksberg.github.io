// Please see this file for the latest firebase-js-sdk version:
// https://github.com/firebase/flutterfire/blob/master/packages/firebase_core/firebase_core_web/lib/src/firebase_sdk_version.dart
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAfQs2simMqjfd6C-eiqGcHateGEGtxGug",
  appId: "1:362261298213:web:1073555d230ac894fb53cc",
  messagingSenderId: "362261298213",
  projectId: "happo-380403",
  authDomain: "happo-380403.firebaseapp.com",
  storageBucket: "happo-380403.firebasestorage.app",
});

const messaging = firebase.messaging();

// Optional:
messaging.onBackgroundMessage((message) => {
  console.log("onBackgroundMessage", message);

  const notificationTitle =
    message.notification.title || "Background Notification Title";
  const notificationOptions = {
    body: message.notification.body || "Background Notification Body",
    image: message.notification.icon || "/default-icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
