import { database } from '../firebase';
// import {bindActionCreators}

export const addUser = user => ({
  type: 'ADD_USER',
  displayName: user.displayName,
  uid: user.uid,
  photoURL: user.photoURL,
});

export const showOnlineUsersAction = () => ({
  type: 'UPDATE_PLAYERS',
});

export const startListeningForUsers = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  game.on('value', (snapshot) => {
    // console.log('startListeningForUsers ', snapshot.val());
    dispatch(showOnlineUsersAction());
  });
};
