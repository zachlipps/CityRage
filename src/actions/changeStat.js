import { database } from '../firebase';

export const changeStat = (uid, absChange = -5, stat = 'health') => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  game.child(`players/${uid}`).once('value')
  .then((snapshot) => {
    let currentStat = snapshot.val().stats[stat];
    const displayName = snapshot.val().displayName;
    currentStat += absChange;
    game.child(`players/${uid}/stats/${stat}`).set(currentStat);
    return [currentStat, displayName];
  });
};

