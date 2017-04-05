import market from '../Cards/cards';

export default function (state = market, action) {
  const copy = Object.assign({}, state);
  switch (action.type) {
    case 'BUY_CARD':
      for (let i = 0; i < copy.face_up.length; i++) {
        if (copy.face_up[i].title === action.card) {
          copy.face_up.splice(i, 1);
        }
      }
      return copy;
    case 'DEAL_CARD':
      if (copy.face_up.length < 3) {
        const toBeDealt = copy.deck[0];
        copy.face_up.push(toBeDealt);
        copy.deck.shift();
      }
      return copy;
    case 'DEAL_NEW_MARKET':
      copy.face_up.forEach((c) => {
        copy.discarded.push(c);
      });
      copy.face_up = [];
      return copy;
    default:
      return state;
  }
}
