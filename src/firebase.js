

import firebase from 'firebase/app';

import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAZyKhnDZcz4uZhnRm-wlaewqQctFCfMOc",
    authDomain: "devcamp-r12-f1ab1.firebaseapp.com",
    projectId: "devcamp-r12-f1ab1",
    storageBucket: "devcamp-r12-f1ab1.appspot.com",
    messagingSenderId: "1070593650250",
    appId: "1:1070593650250:web:6494af0a0e86125c7e00b3"
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();