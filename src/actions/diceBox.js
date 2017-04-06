import { database } from '../firebase';

const diceOptions = {
  1: '1',
  2: '2',
  3: '3',
  4: 'power',
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

const decrementRoll = () => database.ref('/rollCount').once('value', (snapshot) => {
  const rollCount = snapshot.val();
  return rollCount;
}).then((rollCount) => {
  const newRollCount = rollCount.val() - 1;
  database.ref('/rollCount').set(newRollCount);
  console.log('low key fam lmaoi', newRollCount);
  return newRollCount;
});

export const rollDice = () => (dispatch) => {
  let listOfDice;


  database.ref('/diceBox').once('value', (snapshot) => {
    listOfDice = snapshot.val();
  }).then(() => {
    for (const i in listOfDice) {
      if (listOfDice[i].selected !== true) {
        database.ref(`/diceBox/${i}`).set({ val: diceOptions[randNum()], selected: false });
      }
    }
  },
)
.then(() => {
  database.ref('/diceBox').once('value', (snapshot) => {
    listOfDice = snapshot.val();
  })
  .then(() => {
    dispatch(updateRolls(listOfDice));
    return decrementRoll();
    // dispatch(updateRollCount(decrementRoll());)
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
  database.ref(`/diceBox/${die}`).once('value', (snapshot) => {
    valueOfSelected = snapshot.val().selected;
    valueOfVal = snapshot.val().val;
  }).then(() => {
    if (valueOfVal !== '?') {
      database.ref(`/diceBox/${die}/selected`).set(!valueOfSelected).then(() => {
        database.ref('/diceBox').once('value', (snapshot) => {
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
 // When submitRoll is clicked grab the user's dice and apply effects
  database.ref('/diceBox').once('value', (snapshot) => {
    for (const i in snapshot.val()) {
      submittedRoll.push(snapshot.val()[i].val);
    }
  }).then(() => {
    // if there are any attacks
    if (submittedRoll.indexOf('attack') !== -1) {
      // check to see if there's a king
      database.ref('/king').once('value', (snapshot) => {
        if (snapshot.val() === 'none') {
          // if not set this user as the king
          setKing();
        } else {
          // else ask the other king if they want to leave
        }
      });
    }
  });
};


const setKing = () => {
  database.ref('currentPlayer').once('value', (snapshot) => {
    console.log(snapshot.val());
    return snapshot.val();
  }).then((currentPlayer) => {
    console.log(currentPlayer.val());
    database.ref('/king').set(currentPlayer.val());
  });
};
