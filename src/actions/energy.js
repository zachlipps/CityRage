import { database } from '../firebase';

const game = database.ref('games/aqwewq334');


export const increaseEnergy = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let energy;
     game.child(`players/${uid}`).once('value', (snapshot) => {
       energy = snapshot.val().stats.energy;
       console.log(energy);
     });
     energy += 1;
     game.child(`players/${uid}/stats/energy`).set(energy);
   };

export const decreaseEnergy = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let energy;
     game.child(`players/${uid}`).once('value', (snapshot) => {
       energy = snapshot.val().stats.energy;
       console.log(energy);
     });
     energy -= 1;
     game.child(`players/${uid}/stats/energy`).set(energy);
   };
