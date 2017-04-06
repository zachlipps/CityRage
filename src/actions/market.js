import shuffle from 'lodash/shuffle';
import { database } from '../firebase';
const marketRef = database.ref('/market');

// add logic to get the card to the player's hand
export const buyCard = (card, buyer) => (dispatch) => {
  marketRef.once('value', (snapshot) => {
    const copy = snapshot.val();
    for (let i = 0; i < copy.face_up.length; i++) {
      if (copy.face_up[i].title === card) {
        copy.face_up.splice(i, 1);
      }
    }
    marketRef.set(copy);
    dispatch({ type: 'BUY_CARD', payload: copy });
  });
};

export const dealCard = () => (dispatch) => {
  marketRef.once('value', (snapshot) => {
    const copy = snapshot.val();
    if (!copy.face_up) copy.face_up = [];
    if (copy.face_up.length < 3 && copy.deck.length > 0) {
      const toBeDealt = copy.deck[0];
      copy.face_up.push(toBeDealt);
      copy.deck.shift();
    }
    marketRef.set(copy);
    dispatch({ type: 'DEAL_CARD', payload: copy });
  });
};

export const resetMarket = () => (dispatch) => {
  marketRef.once('value', (snapshot) => {
    const copy = snapshot.val();
    if (!copy.deck) {
      copy.deck = shuffle(copy.discarded);
      copy.discarded = [];
    }
    if (!copy.face_up) copy.face_up = [];
    if (!copy.discarded) copy.discarded = [];
    copy.face_up.forEach(card => copy.discarded.push(card));
    copy.face_up = [];
    const length = copy.deck.length >= 3 ? 3 : copy.deck.length;
    for (let i = 0; i < length; i++) {
      copy.face_up.push(copy.deck[0]);
      copy.deck.splice(0, 1);
    }
    marketRef.set(copy);
    dispatch({ type: 'DEAL_NEW_MARKET', payload: copy });
  });
};

