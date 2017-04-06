import { database } from '../firebase';
import keys from 'lodash/keys';
import market from '../Cards/cards';

const startGameAction = user => ({
  type: 'START_GAME',
  user,
});

export const startGame = () => (dispatch) => {
  database.ref('/users').once('value', snapshot => (snapshot.val()))
    .then(ukeys => ukeys.val()[keys(ukeys.val())[0]])
    .then((userID) => { database.ref('/currentPlayer').set({ displayName: userID.displayName, uid: userID.uid }); return userID.displayName; })
    .then(user => dispatch(startGameAction(user)))
    .then(() => database.ref('market').set(market));
};

