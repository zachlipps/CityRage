import { database } from '../firebase';
// import {bindActionCreators}
const usersRef = database.ref('users');
const game = database.ref('games/aqwewq334');

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
  game.on('value', (snapshot) => {
    console.log('startListeningForUsers ', snapshot.val());
    dispatch(showOnlineUsersAction());
  });
};
