import * as firebase from 'firebase';
import { FirebaseConfig } from './config/keys';
import { logInSet } from './redux/actions'
firebase.initializeApp(FirebaseConfig);

export const db = firebase.firestore();


export const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/Land',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
};