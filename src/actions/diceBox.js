import { database } from '../firebase';
import groupBy from 'lodash/groupBy';

const game = database.ref('games/aqwewq334');

const diceOptions = {
  1: '1',
  2: '2',
  3: '3',
  4: 'energy',
  5: 'health',
  6: 'attack',
};
const randNum = () => Math.floor((Math.random() * 6) + 1);

const updateRolls = listOfDice => ({
  type: 'UPDATE_DICEBOX',
  listOfDice,
});

const updateRollCount = newRollCount => ({
  type: 'UPDATE_ROLLCOUNT',
  newRollCount,
});

const decrementRoll = () => game.child('/rollCount').once('value')
.then((rollCount) => {
  const newRollCount = rollCount.val() - 1;
  game.child('/rollCount').set(newRollCount);
  console.log('low key fam lmaoi', newRollCount);
  return newRollCount;
});

export const rollDice = () => (dispatch) => {
  // if rollCount greater than 1, {decrement} else {submit}
  game.child('/rollCount').once('value').then((rollCount) => {
    if (rollCount.val() > 0) {
      // gets the dice and changes each value
      game.child('/diceBox').once('value')
      .then((listOfDiceSnap) => {
        const listOfDice = listOfDiceSnap.val();
        for (const i in listOfDice) {
          if (listOfDice[i].selected !== true) {
            game.child(`/diceBox/${i}`).set({ val: diceOptions[randNum()], selected: false });
          }
        }
      }).then(() => {
        game.child('/diceBox').once('value').then((updatedDice) => {
          dispatch(updateRolls(updatedDice.val()));
          decrementRoll().then(newRollCount => dispatch(updateRollCount(newRollCount)));
        });
      });
    }
  });
};


const selectDie = die => ({
  type: 'CHANGE_SELECTED_DICE',
  die,
});

export const selectDice = die => (dispatch) => {
  let valueOfSelected;
  let valueOfVal;
  game.child(`/diceBox/${die}`).once('value', (snapshot) => {
    valueOfSelected = snapshot.val().selected;
    valueOfVal = snapshot.val().val;
  }).then(() => {
    if (valueOfVal !== '?') {
      game.child(`/diceBox/${die}/selected`).set(!valueOfSelected).then(() => {
        game.child('/diceBox').once('value', (snapshot) => {
          const other = {};
          for (const i in snapshot.val()) {
            other[i] = snapshot.val()[i];
          }
          dispatch(selectDie(other));
        });
      });
    }
  });
};

export const submitRoll = die => (dispatch) => {
  const submittedRoll = [];
  let currentPlayer = '';
 // When submitRoll is clicked grab the user's dice and apply effects
  game.child('/diceBox').once('value', (snapshot) => {
    for (const i in snapshot.val()) {
      submittedRoll.push(snapshot.val()[i].val);
    }
  })
  .then(() => {
    game.child('chosenOne').once('value', (snapshot) => {
      currentPlayer = snapshot.val();
      return currentPlayer;
    })
  .then((currentPlayer) => {
    const objectifiedRolls = groupBy(submittedRoll);
    currentPlayer = currentPlayer.val().uid;

    // check for heal
    if (objectifiedRolls.health !== undefined && objectifiedRolls.health.length !== 0) {
      game.child(`/players/${currentPlayer}/stats/health`).once('value', (snapshot) => {
        const health = snapshot.val() + objectifiedRolls.health.length;
        game.child(`/players/${currentPlayer}/stats/health`).set(health);
      });
    }

    // check power
    console.log(objectifiedRolls);
    if (objectifiedRolls.energy !== undefined && objectifiedRolls.energy.length !== 0) {
      console.log('energy', objectifiedRolls.energy.length);
      game.child(`/players/${currentPlayer}/stats/energy`).once('value', (snapshot) => {
        const energy = snapshot.val() + objectifiedRolls.energy.length;
        game.child(`/players/${currentPlayer}/stats/energy`).set(energy);
      });
    }


    // check for numbers 3
    if (objectifiedRolls[3] && objectifiedRolls[3].length >= 3) {
      //
      const bonus = objectifiedRolls[3].length - 3;
      game.child(`/players/${currentPlayer}/stats/points`).once('value', (snapshot) => {
        const points = snapshot.val() + bonus + 3;
        game.child(`/players/${currentPlayer}/stats/points`).set(points);
      });
    }

     // check for numbers 2
    if (objectifiedRolls[2] && objectifiedRolls[2].length >= 3) {
      //
      const bonus = objectifiedRolls[2].length - 3;
      game.child(`/players/${currentPlayer}/stats/points`).once('value', (snapshot) => {
        const points = snapshot.val() + bonus + 2;
        game.child(`/players/${currentPlayer}/stats/points`).set(points);
      });
    }


     // check for numbers 1
    if (objectifiedRolls[1] && objectifiedRolls[1].length >= 3) {
      //
      const bonus = objectifiedRolls[1].length - 3;
      game.child(`/players/${currentPlayer}/stats/points`).once('value', (snapshot) => {
        const points = snapshot.val() + bonus + 1;
        game.child(`/players/${currentPlayer}/stats/points`).set(points);
      });
    }


    // if there are any attacks
    {
      if (submittedRoll.indexOf('attack') !== -1) {
      // check to see if there's a king
        game.child('/king').once('value', (snapshot) => {
          if (snapshot.val() === 'none') {
          // if not set this user as the king
            setKing();
          } else {
          // else ask the other king if they want to leave
          }
        });
      }
    }
  });
  });
};


const setKing = () => {
  game.child('/chosenOne').once('value', (snapshot) => {
    console.log(snapshot.val());
    return snapshot.val();
  }).then((currentPlayer) => {
    console.log(currentPlayer.val());
    game.child('/king').set(currentPlayer.val());
  });
};


export const endTurn = () => (dispatch) => {
  const currentTurn = game.child('/currentTurn').once('value');
  const gameSize = game.child('/gameSize').once('value');
  Promise.all([currentTurn, gameSize])
  .then((array) => {
    const nextTurn = (array[0].val() + 1) % array[1].val();
    game.child('/currentTurn').set(nextTurn);
    return nextTurn;
  })
  .then((nextTurn) => {
    game.child(`/playerPosition/${nextTurn}`).once('value')
    .then(playerID => game.child(`/players/${playerID.val()}`).once('value'))
    .then((player) => {
      game.child('/chosenOne').set({ uid: player.val().uid, displayName: player.val().displayName });
      game.child('/rollCount').set(0);
    });
  });
};


// change redux state and restart the roll count

