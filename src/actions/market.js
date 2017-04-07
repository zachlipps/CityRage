import shuffle from 'lodash/shuffle';
import { database } from '../firebase';
const marketRef = database.ref('/market');
const usersRef = database.ref('/users');

function firebaseFix(obj) {
  if (!obj.deck) obj.deck = [];
  if (!obj.face_up) obj.face_up = [];
  if (!obj.discarded) obj.discarded = [];
}

function regenDeckIfEmpty(obj) {
  if (!obj.deck || obj.deck.length === 0) {
    obj.deck = [];
    obj.deck = shuffle(obj.discarded);
    obj.discarded = [];
  }
}

function dealCard(obj) {
  obj.face_up.push(obj.deck[0]);
  obj.deck.shift();
}

// add logic that checks whether the player can buy; and substract the energy
export const buyCard = (card, buyer) => (dispatch) => {
  database.ref('/').once('value', (allData) => {
    firebaseFix(allData.val().market);
    const market = allData.val().market;
    console.log('FIXED MARKET', market);
    const player = allData.val().users[buyer];
  // check buyer.uid = current palyer.uid <----------- missing
    if (player.stats.energy >= card.cost) {
      player.stats.energy -= card.cost;
      player.hand.push(card);
      market.face_up = market.face_up.filter(c => c.title !== card.title);
      if (market.deck.length > 0) {
        dealCard(market);
        regenDeckIfEmpty(market);
      }
    } else {
      console.log('not enough energy');
    }
    database.ref('/').set(allData.val())
    .then(() => dispatch({ type: 'DEAL_CARD', payload: market }));
  });
};

export const resetMarket = () => (dispatch) => {
  marketRef.once('value', (snapshot) => {
    const copy = snapshot.val();
    firebaseFix(copy);
    regenDeckIfEmpty(copy);
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

  // marketRef.once('value', (snapshot) => {
  //   const copy = snapshot.val();
  //   firebaseFix(copy);
  //   copy.face_up = copy.face_up.filter(c => c.title !== card.title);
  //   if (copy.deck.length > 0) {
  //     dealCard(copy);
  //     regenDeckIfEmpty(copy);
  //   }
  //   marketRef.set(copy)
  //   // when done: set the line bellow inside the check for energy creds after it
  //   .then(() => usersRef.once('value', (users) => {
  //     if (users.val()[buyer].stats.energy >= card.cost) {
  //       const energyLeft = users.val()[buyer].stats.energy - card.cost;
  //       database.ref(`/users/${buyer}/stats/energy`).set(energyLeft)
  //       .then(() => database.ref(`/users/${buyer}/hand`).push(card);
  //     } else {
  //       console.log('not enough energy!!');
  //     }
  //   }))
  //   .then(() => dispatch({ type: 'DEAL_CARD', payload: copy }));
  // });
