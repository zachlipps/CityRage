import {auth, database, googleAuthProvider} from '../firebase';
// import {addUser} from './users';
import pick from 'lodash/pick';

const usersRef = database.ref('users');

export const signIn = () => {
  return (dispatch) => {
    dispatch({type: 'ATTEMPTING_LOGIN'});
    auth.signInWithPopup(googleAuthProvider);
  };
};

export const signOut = (uid) => {  
  return (dispatch) => {
    dispatch({type: 'ATTEMPTING_LOGIN'});

    database.ref('users/' + uid).child('currentlyOn').set(false);
    
    auth.signOut();    
  };
};

const signedIn = (user) => {
  return {
    type: 'SIGN_IN',
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid
  };
};

const signedOut = () => {
  return {
    type: 'SIGN_OUT'
  };
};

export const startListeningToAuthChanges = () => {
  return (dispatch) => {
    auth.onAuthStateChanged((user)=>{
      if (user) { 
        dispatch(signedIn(user));

        var obj = Object.assign({}, pick(user, ['displayName', 'photoURL', 'email', 'uid']), {
          'currentlyOn': true
        });

        usersRef.child(user.uid).set(obj);

      } else {
        dispatch(signedOut()); 
      }
    });
  };
};