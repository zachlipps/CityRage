import shuffle from 'lodash/shuffle';
import { database } from '../firebase';
import fire from '../Cards/effects';

// gameRef later will set the game-hash-id dynamically
const gameId = 'aqwewq334';
const gameRef = database.ref(`games/${gameId}`);

function firebaseFix(obj) {
  obj.deck = obj.deck || [];
  obj.face_up = obj.face_up || [];
  obj.discarded = obj.discarded || [];
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
export const buyCard = (card, buyer, roomId) => (dispatch) => {
  let market = {};
  gameRef.once('value', (gameData) => {
    const consumer = gameData.val().players[buyer];
    market = gameData.val().market;
    firebaseFix(market);
    if (consumer.stats.energy >= card.cost) {
      consumer.stats.energy -= card.cost;
      market.face_up = market.face_up.filter(c => c.title !== card.title);
      if (card.type === 'Discard') {
        fire[card.effect](consumer);
        market.discarded.push(card);
      }
      if (card.type === 'Keep') {
        if (!Array.isArray(consumer.hand)) {
          consumer.hand = [];
        }
        consumer.hand.push(card);
      }
      dealCard(market);
      regenDeckIfEmpty(market);
    }
    gameRef.child('market').set(market)
    .then(() => gameRef.child('players').child(buyer).set(consumer));
  })
  .then(() => dispatch({ type: 'DEAL_CARD', payload: market }));
};

// "room" parameter must be dynamically set to gameID - not yet implemented
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
