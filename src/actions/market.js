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
