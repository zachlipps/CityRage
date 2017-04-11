import { database } from '../firebase';

const game1 = database.ref('games/aqwewq334');


export const increaseEnergy = uid => (dispatch, storeState) => {
  const gid = storeState.val().auth.gid;
  const game = database.ref(`game/${gid}`);

  console.log('hi', game);

  let energy;
  game.child(`players/${uid}`).once('value', (snapshot) => {
    energy = snapshot.val().stats.energy;
  });
  energy += 1;
  game.child(`players/${uid}/stats/energy`).set(energy);
};

export const decreaseEnergy = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let energy;
     game1.child(`players/${uid}`).once('value', (snapshot) => {
       energy = snapshot.val().stats.energy;
       console.log(energy);
     });
     energy -= 1;
     game1.child(`players/${uid}/stats/energy`).set(energy);
   };

