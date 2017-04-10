import { database } from '../firebase';

const game = database.ref('games/aqwewq334');

export const changeStat = (uid, absChange = -2, stat = 'health') => {
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
      console.log('this player is hecka dead right now', displayName, uid);
      killPlayer(uid);
    }
  });
};

export const killPlayer = (uid) => {
  // this also needs to let the player know that they are dead
  game.child('/playerPosition').once('value')
  .then((playerArr) => {
    const newPlayerPos = playerArr.val().filter(playerID => playerID !== uid);
    if (newPlayerPos.length === 1) {
      // make the last person in the array win the game
    } else {
      game.child('/gameSize').set(newPlayerPos.length);
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
