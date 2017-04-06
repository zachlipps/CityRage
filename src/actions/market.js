import { database } from '../firebase';
import market from '../Cards/cards';

// const marketRef = database.ref('market');

// must move all logic from market-reducer to this file!
export const buyCard = (card, buyer) => ({
  type: 'BUY_CARD',
  card,
  buyer,
});

export const dealCard = () => ({
  type: 'DEAL_CARD',
});

export const resetMarket = () => ({
  type: 'DEAL_NEW_MARKET',
});

// for reference
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// export const updateMarket = () => ({
//   type: 'UPDATE_MARKET',
// });

// export const startListeningToMarket = () => (dispatch) => {
//   marketRef.on('value', (snapshot) => {
//     dispatch(updateMarket());
//   });
// };
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
