import { database } from '../firebase';
// import {bindActionCreators}
const usersRef = database.ref('users');


export const addUser = user => ({
  type: 'ADD_USER',
  displayName: user.displayName,
  uid: user.uid,
  photoURL: user.photoURL,
});


export const showOnlineUsersAction = () => ({
  type: 'UPDATE_PLAYERS',
});

export const startListeningForUsers = () => (dispatch) => {
  usersRef.on('value', (snapshot) => {
    dispatch(showOnlineUsersAction());
  });
};

