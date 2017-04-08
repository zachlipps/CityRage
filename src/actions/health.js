import { database } from '../firebase';

const game = database.ref('games/aqwewq334');

export const increaseHealth = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let health;
     game.child(`players/${uid}`).once('value', (snapshot) => {
       health = snapshot.val().stats.health;
       console.log(health);
     });
     health += 1;
     game.child(`players/${uid}/stats/health`).set(health);
   };


export const decreaseHealth = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let health;
     game.child(`players/${uid}`).once('value', (snapshot) => {
       health = snapshot.val().stats.health;
       console.log(health);
     });
     health -= 1;
     game.child(`players/${uid}/stats/health`).set(health);
   };
