import { database } from './firebase';

const initialState = {
  auth: {
    status: 'ANONYMOUS',
    email: null,
    displayName: null,
    photoURL: null,
    uid: null,
  },
  users: { },
  currentDice: {
    one: { val: '?', selected: false },
    two: { val: '?', selected: false },
    three: { val: '?', selected: false },
    four: { val: '?', selected: false },
    five: { val: '?', selected: false },
    six: { val: '?', selected: false },
  },
  rollCount: 3,
};


// set the dicebox
database.ref('/diceBox/one').set({ val: '?', selected: false });
database.ref('/diceBox/two').set({ val: '?', selected: false });
database.ref('/diceBox/three').set({ val: '?', selected: false });
database.ref('/diceBox/four').set({ val: '?', selected: false });
database.ref('/diceBox/five').set({ val: '?', selected: false });
database.ref('/diceBox/six').set({ val: '?', selected: false });

// set roll count
database.ref('/rollCount').set(3);
// set king
database.ref('/king').set('none');
// set current player
database.ref('/currentPlayer').set('none');

export default initialState;
