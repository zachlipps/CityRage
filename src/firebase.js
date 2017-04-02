import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyCFpmRsIrwtXeHS_9BMHAlO6rgc42UMerM',
  authDomain: 'cityrampage-b6c5e.firebaseapp.com',
  databaseURL: 'https://cityrampage-b6c5e.firebaseio.com',
  projectId: 'cityrampage-b6c5e',
  storageBucket: 'cityrampage-b6c5e.appspot.com',
  messagingSenderId: '329061091955'
};
firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
