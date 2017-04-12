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
  })
  .then((playerArr) => {
    const currentStat = playerArr[0];
    const displayName = playerArr[1];
    if (stat === 'points' && currentStat > 20) {
      console.log(displayName, 'wins!');
    } else if (stat === 'health' && currentStat <= 0) {
      console.log('this player is heLLA dead right now:', displayName, uid);
      dispatch(killPlayer(uid));
    }
  });
};

export const killPlayer = uid => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);
  // this also needs to let the player know that they are dead
  game.child('/playerPosition').once('value')
  .then((playerArr) => {
    const newPlayerPos = playerArr.val().filter(playerID => playerID !== uid);
    game.child('/playerPosition').set(newPlayerPos);
    game.child('/gameSize').set(newPlayerPos.length);
    dispatch({ type: 'UPDATE_DEAD', payload: 'YOYOYO' });
    if (newPlayerPos.length === 1) {
      console.log('SOMEONE WON THE GAME');
    }
  })
  .then(() => {
    game.child('/deadPlayers').once('value', (snapshot) => {
      if (!snapshot.val()) {
        game.child('/deadPlayers').set([uid]);
      } else {
        const newDeadPlayerArr = [...snapshot.val(), uid];
        game.child('/deadPlayers').set(newDeadPlayerArr);
      }
    });
  });
};
