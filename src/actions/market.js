import shuffle from 'lodash/shuffle';
import { database } from '../firebase';

// gameRef later will set the game-hash-id dynamically
const gameId = 'aqwewq334';
const gameRef = database.ref(`games/${gameId}`);

function firebaseFix(obj) {
  console.log('fbFix before', obj);
  obj.deck = obj.deck || [];
  obj.face_up = obj.face_up || [];
  obj.discarded = obj.discarded || [];
  console.log('fbFix after', obj);
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
export const buyCard = (room, card, buyer) => (dispatch) => {
  // // check buyer.uid = current palyer.uid <----------- missing
  //   if (player.stats.energy >= card.cost) {
  //     player.stats.energy -= card.cost;
  //     player.hand.push(card);
  //
  //     if (market.deck.length > 0) {
  //       dealCard(market);
  //       regenDeckIfEmpty(market);
  //     }
  //   } else {
  //     console.log('not enough energy');
  //   }
  //   database.ref('/').set(allData.val())
  //   .then(() => dispatch({ type: 'DEAL_CARD', payload: market }));
  // });
};

// "room" parameter to be set to gameID dynamically
export const resetMarket = () => (dispatch) => {
  gameRef.child('market').once('value', (marketData) => {
    const market = marketData.val();
    firebaseFix(market);
    market.face_up.forEach(card => market.discarded.push(card));
    market.face_up = [];
    for (let i = 0; i < 3; i++) {
      dealCard(market);
      regenDeckIfEmpty(market);
    }
    gameRef.child('market').set(market)
    .then(() => dispatch({ type: 'DEAL_NEW_MARKET', payload: market }));
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
