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
    const playerObj = Object.assign({}, user.val(), {
      turnOrder: idx,
      stats: {
        energy: 0,
        health: 10,
        points: 0,
      },
      triggers: {
        coolAf: true,
      },
      hand: {
        test: 'test',
      },
    });
    return [uid, playerObj];
  });


export const startGame = () => (dispatch) => {
  const playerArr = [];
  game.child('/king').set('none');
  game.child('/playerPosition').once('value')
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
      game.child('players').set(playerObj);
    })
    .then(
      game.child('/playerPosition').once('value')
      .then(newPlayerArr => dispatch(startGameAction(newPlayerArr)))
      .then(() => {
        // console.log('GAME STARTED - MARKET REFRESH');
        game.child('market').set(market);
      }),
    )
    .then(() => setFirstPlayer());

    // init data
  initalizeOnGameStart();
};


const setFirstPlayer = () => {
  game.child('/playerPosition').once('value')
  .then((playersArray) => {
    const gameSize = playersArray.val().length;
    const firstPlayerIdx = Math.floor(Math.random() * gameSize);
    game.child('/currentTurn').set(firstPlayerIdx);
    game.child('/gameSize').set(gameSize);
    return playersArray.val()[firstPlayerIdx];
  }).then((firstPlayer) => {
    game.child('/players').once('value')
    .then((players) => {
      // console.log('this is the players.val() first VAL', players.val());
      game.child('/chosenOne').set({ uid: players.val()[firstPlayer].uid, displayName: players.val()[firstPlayer].displayName });
    });
  }).then(() => {
    game.child('started').set(true);
  });
};

const initalizeOnGameStart = () => {
  game.child('/rollCount').set(3).then((thing) => { console.log('it worked!', thing); });
  game.child('/diceBox').set({
    one: { val: '?', selected: false },
    two: { val: '?', selected: false },
    three: { val: '?', selected: false },
    four: { val: '?', selected: false },
    five: { val: '?', selected: false },
    six: { val: '?', selected: false },
  },
  );
};
