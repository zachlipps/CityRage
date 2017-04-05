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

