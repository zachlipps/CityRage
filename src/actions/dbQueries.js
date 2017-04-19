import { database } from '../firebase';

function firebaseFix(obj) {
  obj.deck = obj.deck || [];
  obj.face_up = obj.face_up || [];
  obj.discarded = obj.discarded || [];
}

class firebaseQueries {
  static getGame(gid) {
    return database.ref(`games/${gid}`).once('value', (gameData) => {
      const room = gameData.val();
      firebaseFix(room.market);
      return room;
    });
  }
  static setGame(gid, gameData) {
    return database.ref(`games/${gid}`).set(gameData);
  }
}

export default firebaseQueries;
