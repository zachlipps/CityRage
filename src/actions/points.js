import { database } from '../firebase';

const game = database.ref('games/aqwewq334');

export const increasePoints = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let points;
     game.child(`players/${uid}`).once('value', (snapshot) => {
       points = snapshot.val().stats.points;
       console.log(points);
     });
     points += 1;
     game.child(`players/${uid}/stats/points`).set(points);
   };


export const decreasePoints = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let points;
     game.child(`players/${uid}`).once('value', (snapshot) => {
       points = snapshot.val().stats.points;
       console.log(points);
     });
     points -= 1;
     game.child(`players/${uid}/stats/points`).set(points);
   };

