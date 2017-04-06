import market from '../Cards/cards';
import { database } from '../firebase';

// working on executing these actions in firebase as well
// logic will be transfered to market's action file.

export default function (state = market, action) {
  const copy = Object.assign({}, state);
  switch (action.type) {
    case 'BUY_CARD':
      for (let i = 0; i < copy.face_up.length; i++) {
        if (copy.face_up[i].title === action.card) {
          copy.face_up.splice(i, 1);
        }
      }
      // copy.face_up.filter(card => card.title !== action.card)
      return copy;
    case 'DEAL_CARD':
      console.log('deal card reducer fired');
      if (copy.face_up.length < 3 && copy.deck.length > 0) {
        const toBeDealt = copy.deck[0];
        copy.face_up.push(toBeDealt);
        copy.deck.shift();
      }
      return copy;
    case 'DEAL_NEW_MARKET':
      copy.face_up.forEach(card => copy.discarded.push(card));
      copy.face_up = [];
      const length = copy.deck.length >= 3 ? 3 : copy.deck.length;
      for (let i = 0; i < length; i++) {
        copy.face_up.push(copy.deck[0]);
        copy.deck.splice(0, 1);
      }
      return copy;
    default:
      return state;
  }
}

// for reference
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// export default function (state = [], action) {
//   switch (action.type) {
//     case 'UPDATE_PLAYERS' :
//       return showOnlineUsers();
//     default:
//       return state;
//   }
// }


// export const showOnlineUsers = () => {
//   const array = [];
//   database.ref('/users').on('value', (snapshot) => {
//     snapshot.forEach((user) => {
//       if (user.val().currentlyOn) {
//         array.push(user.val());
//       }
//     });
//   });
//   return array;
// };
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
