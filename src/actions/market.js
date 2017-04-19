import shuffle from 'lodash/shuffle';

import db from './dbQueries';
import { database } from '../firebase';
import { gameSettings } from '../initial-state';
import fire from '../Cards/effects';

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

export const buyCard = (card, buyerId, chosenOneUid) => (dispatch, storeState) => {
  if (buyerId === chosenOneUid) {
    const gid = storeState().auth.gid;
    let market = {};

    db.getGame(gid)
    .then((gameData) => {
      const room = gameData.val();
      console.log('game data in first promise process', room);
      const consumer = room.players[buyerId];
      market = room.market;
      if (consumer.stats.energy >= card.cost) {
        consumer.stats.energy -= card.cost;
        market.face_up = market.face_up.filter(c => c.title !== card.title);
        if (card.type === 'Discard') {
          fire[card.effect](consumer, room);
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
      return room;
    })
    .then((room) => {
      db.setGame(gid, room);
      return room;
    })
    .then(room => dispatch({ type: 'DEAL_CARD', payload: room.market }));
  }
};

export const resetMarket = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  game.child('market').once('value', (marketData) => {
    const market = marketData.val();
    firebaseFix(market);
    market.face_up.forEach(card => market.discarded.push(card));
    market.face_up = [];

    for (let i = 0; i < 3; i++) {
      dealCard(market);
      regenDeckIfEmpty(market);
    }

    game.child('market').set(market)
    .then(() => dispatch({ type: 'DEAL_NEW_MARKET', payload: market }));
  });
};

// reset market reset with energy check
export const userResetMarket = (userUid, chosenOneUid) => (dispatch, storeState) => {
  if (userUid === chosenOneUid) {
    const gid = storeState().auth.gid;
    const game = database.ref(`games/${gid}`);

    game.child('players').once('value', (players) => {
      const allPlayers = players.val();
      const player = allPlayers[userUid];

      if (player.stats.energy >= gameSettings.resetMarketCost) {
        player.stats.energy -= gameSettings.resetMarketCost;
        dispatch(resetMarket());
      }

      game.child('players').set(allPlayers);
    });
  }
};

export const marketListener = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);
  game.child('/market').on('value', (newMarket) => {
    dispatch({ type: 'DEAL_NEW_MARKET', payload: newMarket.val() });
  });
};
