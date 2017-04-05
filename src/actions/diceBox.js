import { database } from '../firebase';
import groupBy from 'lodash/groupBy';

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
).then(() => {
  database.ref('/diceBox').once('value', (snapshot) => {
    listOfDice = snapshot.val();
  }).then(() => {
    console.log(listOfDice);
    dispatch(updateRolls(listOfDice));
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


// const getCurrentPlayer = () => {
//   let playerName;
//   database.ref('currentPlayer').once('value', (snapshot) => {
//     console.log(snapshot.val());
//     playerName = snapshot.val();
//   });
//   // NOW WE KNOW THE PLAYER GO LOOP THOUGH ALL USERS TO FIND UID
//   return playerName;
// };

export const submitRoll = die => (dispatch) => {
  const submittedRoll = [];
  let currentPlayer = '';
 // When submitRoll is clicked grab the user's dice and apply effects
  database.ref('/diceBox').once('value', (snapshot) => {
    for (const i in snapshot.val()) {
      submittedRoll.push(snapshot.val()[i].val);
    }
  })
  .then(() => {
    database.ref('currentPlayer').once('value', (snapshot) => {
      currentPlayer = snapshot.val();
      return currentPlayer;
    })
  .then((currentPlayer) => {
    const objectifiedRolls = groupBy(submittedRoll);
    console.log(objectifiedRolls);

    currentPlayer = currentPlayer.val().uid;
    // check for heal
    if (objectifiedRolls.health !== undefined && objectifiedRolls.health.length !== 0) {
      console.log('health', objectifiedRolls.health.length);
      console.log(currentPlayer);
      database.ref(`/users/${currentPlayer}/stats/health`).once('value', (snapshot) => {
        const health = snapshot.val() + objectifiedRolls.health.length;
        database.ref(`/users/${currentPlayer}/stats/health`).set(health);
      });
    }

    // check power
    if (objectifiedRolls.power !== undefined && objectifiedRolls.power.length !== 0) {
      console.log('power', objectifiedRolls.power.length);
    }

    // check for numbs

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
