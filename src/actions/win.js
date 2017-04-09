import { database } from '../firebase';
const usersRef = database.ref('users');

const game = database.ref('games/aqwewq334');

export const startListeningForPlayers = () => (dispatch) => {
  game.child('/players').on('value', (snapshot) => {
    for (const i in snapshot.val()) {
      console.log('yoyooyoyooyo', i);
    }
  });
};
