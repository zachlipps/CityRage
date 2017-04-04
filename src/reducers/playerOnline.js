import { database } from '../firebase';

export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_PLAYERS' :
      console.log('action.playersOnline', action.playersOnline);
      return showOnlineUsers();
    default:
      return state;
  }
}


export const showOnlineUsers = () => {
  const array = [];
  database.ref('/users').on('value', (snapshot) => {
    snapshot.forEach((user) => {
      if (user.val().currentlyOn) {
        array.push(user.val());
      }
    });
  });
  console.log('showOnlineUsers', array);
  return array;
};
