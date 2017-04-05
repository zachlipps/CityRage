export const buyCard = (buyer, card) => ({
  type: 'BUY_CARD',
  buyer,
  card,
});

export const dealCard = () => ({
  type: 'DEAL_CARD',
});

export const resetMarket = () => ({
  type: 'DEAL_NEW_MARKET',
});
