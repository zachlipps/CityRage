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

  // set the current player
  game.child('/playerPosition').once('value')
  .then(playersArray => playersArray.val()[0]).then((firstPlayer) => {
    game.child('/players').once('value')
    .then((players) => {
      game.child('/chosenOne').set({ uid: players.val()[firstPlayer].uid, displayName: players.val()[firstPlayer].displayName });
    });
  });
};
