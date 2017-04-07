import { database } from '../firebase';
import keys from 'lodash/keys';

import market from '../Cards/cards';

const startGameAction = playerArr => ({
  type: 'START_GAME',
  playerArr,
});

const initializePlayer = (uid, idx) => database.ref(`/users/${uid}`).once('value')
  .then((user) => {
    const playerObj = Object.assign({}, {
      uid,
      turnOrder: idx,
      displayName: user.val().displayName,
      stats: {
        energy: 0,
        health: 10,
        points: 0,
      },
    });
    return playerObj;
  });


export const startGame = () => (dispatch) => {
  const playerArr = [];
  database.ref('/PlayersInGame').once('value')
    .then((userIDS) => {
      if (userIDS.val()) {
        userIDS.val().map((userID, idx) => {
          playerArr.push(initializePlayer(userID, idx));
        });
        return playerArr;
      }
    })
    .then(players => Promise.all(players))
    .then(resolvedPlayerArray => database.ref('playerArr').set(resolvedPlayerArray))
    .then(
      database.ref('playerArr').once('value')
      .then(newPlayerArr => dispatch(startGameAction(newPlayerArr))),
    );
};


    //   database.ref('playerArr').set(playerArr[0]);
    // });
    //       .then(() => database.ref('playerArr').once('value', (snapshot) => {
    //         dispatch(startGameAction(snapshot.val()));
    //       }))
    //       .then(() => database.ref('market').set(market));

