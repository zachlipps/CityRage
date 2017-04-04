import { database } from './firebase';

const diceRef = database.ref('diceBox');


export const showOnlineUsers = () => {
  const array = [];
  database.ref('/users').on('value', (snapshot) => {
    snapshot.forEach((user) => {

    });
  });
  console.log('showOnlineUsers', array);
  return array;
};

