import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDXFh3_xJXwGhQDaTFgN_MG3_arS68k_s0",
  authDomain: "easyvocabulary-2b7b1.firebaseapp.com",
  databaseURL: "https://easyvocabulary-2b7b1-default-rtdb.firebaseio.com",
  projectId: "easyvocabulary-2b7b1",
  storageBucket: "easyvocabulary-2b7b1.appspot.com",
  messagingSenderId: "700837026640",
  appId: "1:700837026640:web:df76032b2f14ffccca2a55",
  measurementId: "G-7D3JYW1HGZ",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export default app;
