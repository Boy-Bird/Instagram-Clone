import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC0ihCPR-PZPJPXfmQ-DPMbp2oh5r1irm8",
  authDomain: "instagram-clone-35559.firebaseapp.com",
  projectId: "instagram-clone-35559",
  storageBucket: "instagram-clone-35559.appspot.com",
  messagingSenderId: "772300063990",
  appId: "1:772300063990:web:0b6b8b6f03245b8f2598d7"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export {firebase, db}