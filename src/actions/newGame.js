import { database } from '../firebase';

export const createNewGame = (name, numPlayers = 4, gid = '') => {
  console.log('i was called ', name);
  database.ref('games').push(
    {
      gid,
      numPlayers,
      name,
      rollCount: 3,
      started: false,
      submitted: false,
      diceBox: {
        one: { val: '?', selected: false },
        two: { val: '?', selected: false },
        three: { val: '?', selected: false },
        four: { val: '?', selected: false },
        five: { val: '?', selected: false },
        six: { val: '?', selected: false },
      },
    });
}
;
