import { database } from '../firebase';

export const setKing = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);
  game.child('/chosenOne').once('value', snapshot => snapshot)
  .then((chosenOne) => {
    game.child('/king').set(chosenOne.val());
  });
};
