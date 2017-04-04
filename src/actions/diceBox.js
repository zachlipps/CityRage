import { database } from '../firebase';

// const diceRef = database.ref('diceBox');

export const rollDice = () => (dispatch) => {
  database.ref('/diceBox').push(3);
};

