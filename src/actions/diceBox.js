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

const decrementRoll = () => game.child('/rollCount').once('value', (snapshot) => {
  const rollCount = snapshot.val();
  return rollCount;
}).then((rollCount) => {
  const newRollCount = rollCount.val() - 1;
  game.child('/rollCount').set(newRollCount);
  console.log('low key fam lmaoi', newRollCount);
  return newRollCount;
});

export const rollDice = () => (dispatch) => {
  let listOfDice;
  game.child('/diceBox').once('value', (snapshot) => {
    listOfDice = snapshot.val();
  }).then(() => {
    for (const i in listOfDice) {
      if (listOfDice[i].selected !== true) {
        game.child(`/diceBox/${i}`).set({ val: diceOptions[randNum()], selected: false });
      }
    }
  },
)
.then(() => {
  game.child('/diceBox').once('value', (snapshot) => {
    listOfDice = snapshot.val();
  })
  .then(() => {
    dispatch(updateRolls(listOfDice));
    return decrementRoll();
  })
  .then((newRollCount) => {
    dispatch(updateRollCount(newRollCount));
  });
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
      game.child(`/player/${currentPlayer}/stats/health`).once('value', (snapshot) => {
        const health = snapshot.val() + objectifiedRolls.health.length;
        game.child(`/player/${currentPlayer}/stats/health`).set(health);
      });
    }

    // check power
    console.log(objectifiedRolls);
    if (objectifiedRolls.energy !== undefined && objectifiedRolls.energy.length !== 0) {
      console.log('energy', objectifiedRolls.energy.length);
      database.ref(`/users/${currentPlayer}/stats/energy`).once('value', (snapshot) => {
        const energy = snapshot.val() + objectifiedRolls.energy.length;
        database.ref(`/users/${currentPlayer}/stats/energy`).set(energy);
      });
    }


    // check for numbers 3
    if (objectifiedRolls[3] && objectifiedRolls[3].length >= 3) {
      //
      const bonus = objectifiedRolls[3].length - 3;
      database.ref(`/users/${currentPlayer}/stats/points`).once('value', (snapshot) => {
        const points = snapshot.val() + bonus + 3;
        database.ref(`/users/${currentPlayer}/stats/points`).set(points);
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
  game.child('currentPlayer').once('value', (snapshot) => {
    console.log(snapshot.val());
    return snapshot.val();
  }).then((currentPlayer) => {
    console.log(currentPlayer.val());
    database.ref('/king').set(currentPlayer.val());
  });
};
