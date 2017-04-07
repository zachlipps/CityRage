import shuffle from 'lodash/shuffle';
import { database } from '../firebase';
const marketRef = database.ref('/market');

const currentPlayer = database.ref('/currentPlayer').once('value', snapshot => snapshot.val().uid);

function regenDeckIfEmpty(obj) {
  if (!obj.deck || obj.deck.length === 0) {
    obj.deck = [];
    obj.deck = shuffle(obj.discarded);
    obj.discarded = [];
  }
}

function firebaseFix(obj) {
  if (!obj.deck) obj.deck = [];
  if (!obj.face_up) obj.face_up = [];
  if (!obj.discarded) obj.discarded = [];
}

function dealCard(obj) {
  obj.face_up.push(obj.deck[0]);
  obj.deck.shift();
}

// this function's content will later be passed into the buy card function...
export const addToHand = (card, buyer) => {
  console.log('addToHand fired');
  return { type: 'w.e.' };
};

// TODO: add logic to get the card to the player's hand
export const buyCard = (card, buyer) => (dispatch) => {
  marketRef.once('value', (snapshot) => {
    const copy = snapshot.val();
    firebaseFix(copy);
    copy.face_up = copy.face_up.filter(c => c.title !== card.title);
    if (copy.deck.length > 0) {
      dealCard(copy);
      regenDeckIfEmpty(copy);
    }
    marketRef.set(copy)
    .then(() => dispatch({ type: 'DEAL_CARD', payload: copy }));
  });
};

export const resetMarket = () => (dispatch) => {
  marketRef.once('value', (snapshot) => {
    const copy = snapshot.val();
    firebaseFix(copy);
    if (!copy.deck) {
      copy.deck = shuffle(copy.discarded);
      copy.discarded = [];
    }
    copy.face_up.forEach(card => copy.discarded.push(card));
    copy.face_up = [];
    for (let i = 0; i < 3; i++) {
      dealCard(copy);
      regenDeckIfEmpty(copy);
    }
    marketRef.set(copy)
    .then(() => dispatch({ type: 'DEAL_NEW_MARKET', payload: copy }));
  });
};
