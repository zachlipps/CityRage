import { database } from '../firebase';

const game = database.ref('games/aqwewq334');


const setPlayersInLobby = array => ({
  type: 'UPDATE_PLAYERS_IN_LOBBY',
  playerArray: array,
});


export const playersInLobby = gid => (dispatch) => {
  game.child('/playerPosition').once('value').then((playerList) => {
    console.log(playerList.val());
    dispatch(setPlayersInLobby(playerList.val()));
  });
};

