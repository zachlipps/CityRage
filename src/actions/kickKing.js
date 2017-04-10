import { database } from '../firebase';

const game = database.ref('games/aqwewq334');

export const setKing = () => {
  game.child('/chosenOne').once('value', snapshot => snapshot)
  .then((chosenOne) => {
    game.child('/king').set(chosenOne.val());
  });
};
