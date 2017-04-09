import { database } from '../firebase';

const game = database.ref('games/aqwewq334');

export const changeStat = (uid, absChange = 1, stat = 'energy') => {
  game.child(`players/${uid}`).once('value')
  .then((snapshot) => {
    const currentStat = snapshot.val().stats[stat];
    return currentStat;
  })
  .then((currentStat) => {
    currentStat += absChange;
    game.child(`players/${uid}/stats/${stat}`).set(currentStat);
  });
};
