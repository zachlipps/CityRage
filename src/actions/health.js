import { database } from '../firebase';

export const increaseHealth = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let health;
     database.ref(`users/${uid}`).once('value', (snapshot) => {
       health = snapshot.val().stats.health;
       console.log(health);
     });
     health += 1;
     database.ref(`users/${uid}/stats/health`).set(health);
   };


export const decreaseHealth = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let health;
     database.ref(`users/${uid}`).once('value', (snapshot) => {
       health = snapshot.val().stats.health;
       console.log(health);
     });
     health -= 1;
     database.ref(`users/${uid}/stats/health`).set(health);
   };
