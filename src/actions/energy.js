import { database } from '../firebase';

export const increaseEnergy = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let energy;
     database.ref(`users/${uid}`).once('value', (snapshot) => {
       energy = snapshot.val().stats.energy;
       console.log(energy);
     });
     energy += 1;
     database.ref(`users/${uid}/stats/energy`).set(energy);
   };

export const decreaseEnergy = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let energy;
     database.ref(`users/${uid}`).once('value', (snapshot) => {
       energy = snapshot.val().stats.energy;
       console.log(energy);
     });
     energy -= 1;
     database.ref(`users/${uid}/stats/energy`).set(energy);
   };
