import { database } from '../firebase';
import keys from 'lodash/keys';
import filter from 'lodash/filter';
import market from '../Cards/cards';

const game = database.ref('games/aqwewq334');

const startGameAction = playerArr => ({
  type: 'START_GAME',
  playerArr,
});

const initializePlayer = (uid, idx) => database.ref(`/users/${uid}`).once('value')
  .then((user) => {
    const playerObj = Object.assign({}, {
      turnOrder: idx,
      displayName: user.val().displayName,
      stats: {
        energy: 0,
        health: 10,
        points: 0,
      },
    });
    console.log('this is the uid penis', uid);
    return [uid, playerObj];
  });


export const startGame = () => (dispatch) => {
  const playerArr = [];
  database.ref('/playerPosition').once('value')
    .then((userIDS) => {
      if (userIDS.val()) {
        userIDS.val().map((userID, idx) => {
          playerArr.push(initializePlayer(userID, idx));
        });
        return playerArr;
      }
    })
    .then(players => Promise.all(players))
    .then((resolvedPlayerArray) => {
      const playerObj = {};
      resolvedPlayerArray.map((el) => {
        playerObj[el[0]] = el[1];
      });
      database.ref('playerOBJZACH').set(playerObj);
    })
    .then(
      database.ref('playerArr').once('value')
      .then(newPlayerArr => dispatch(startGameAction(newPlayerArr)))
      .then(() => database.ref('market').set(market)),
    );

  // Populate the players list with the playerPositionArray
  game.child('/playerPosition').once('value')
  .then((playerArray) => {
    database.ref('/users').once('value')
    .then((users, obj = {}) => {
      for (const i in playerArray.val()) {
        const playerObj = Object.assign({}, users.val()[playerArray.val()[i]], {
          turnOrder: i,
          tiggers: {
            coolAf: true,
          },
          hand: {
            test: 'test',
          },
        });
        obj[playerArray.val()[i]] = playerObj;
      }
      game.child('/players').set(obj);
    });
  },
  );

  // set the first player
  game.child('/playerPosition').once('value')
  .then(playersArray => playersArray.val()[0]).then((firstPlayer) => {
    game.child('/players').once('value')
    .then((players) => {
      console.log(players.val());
      game.child('/chosenOne').set({ uid: players.val()[firstPlayer].uid, displayName: players.val()[firstPlayer].displayName });
    });
  }).then(() => {
    game.child('started').set(true);
  });
};
