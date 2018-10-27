import * as firebase from 'firebase';
import { FirebaseConfig } from './config/keys';

firebase.initializeApp(FirebaseConfig);

export const db = firebase.database().ref();


export const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/Home',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ]
};