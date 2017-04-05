export const buyCard = (card, buyer) => ({
  type: 'BUY_CARD',
  card,
  buyer,
});

export const dealCard = () => ({
  type: 'DEAL_CARD',
});

// discards the old ones
// where do i fire the cards
export const resetMarket = () => ({
  type: 'DEAL_NEW_MARKET',
});

// moves card from the user's hand to the discard pile
export const trashCard = () => ({
  type: 'DEAL_NEW_MARKET',
});
