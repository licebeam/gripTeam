import * as firebase from 'firebase';
import { FirebaseConfig } from './config/keys';
import { logInSet } from './redux/actions'
firebase.initializeApp(FirebaseConfig);

export const db = firebase.firestore();


export const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/Home',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};