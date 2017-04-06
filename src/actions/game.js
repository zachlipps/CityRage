import { database } from '../firebase';
import keys from 'lodash/keys';
import market from '../Cards/cards';

const startGameAction = playerArr => ({
  type: 'START_GAME',
  playerArr,
});

const initializePlayer = (uid, idx) => database.ref(`/users/${uid}`).once('value', snapshot => snapshot)
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
  database.ref('/PlayersInGame').once('value', snapshot => (snapshot.val()))
    .then((userIDS) => {
      if (userIDS.val()) {
        userIDS.val().forEach((userID, idx) => {
          initializePlayer(userID, idx)
          .then((playerObj) => {
            const playerArr = [];
            playerArr.push(playerObj);
            return playerArr;
          })
          .then((playerArr) => {
            // eventually this will set at gameID/playerArr
            database.ref('playerArr').set(playerArr);
          })
          .then(() => database.ref('playerArr').once('value', (snapshot) => {
            dispatch(startGameAction(snapshot.val()));
          }))
          .then(() => database.ref('market').set(market));
        });
      }
    });
};

