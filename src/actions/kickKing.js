import { database } from '../firebase';
import { changeStat } from './changeStat';

export const setKing = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const kingUid = storeState().auth.uid;
  const game = database.ref(`games/${gid}`);

  function setNewKing() {
    game.child('/chosenOne').once('value')
    .then((currentPlayer) => {
      game.child('/king').set(currentPlayer.val())
      .then(() => dispatch(changeStat(currentPlayer.val().uid, 1, 'points')));
      game.child(`/players/${currentPlayer.val().uid}/kingOnTurnStart`).set(true);
    });
  }

  if (kingUid) {
    game.child(`/players/${kingUid}/kingOnTurnStart`).set(false)
    .then(setNewKing());
  } else {
    setNewKing();
  }
};
