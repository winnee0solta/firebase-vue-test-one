import {
    firebasekeys
} from './firebasekeys'
// const firebase = require("firebase");
import {
    initializeApp
} from 'firebase'
 
const app = initializeApp({
    apiKey: firebasekeys.apiKey,
    authDomain: firebasekeys.authDomain,
    databaseURL: firebasekeys.databaseURL,
    projectId: firebasekeys.projectId,
    storageBucket: firebasekeys.storageBucket,
    messagingSenderId: firebasekeys.messagingSenderId,
    appId: firebasekeys.appId
})


// export const db = firebase.database()
//setups for firestore 
export const db = app.firestore()
//todos collections
export const todoref = db.collection('todos')