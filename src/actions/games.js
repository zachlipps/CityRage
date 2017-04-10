import { database } from '../firebase';

const game = database.ref('games/aqwewq334');

const updateGamesList = gamesList => ({
  type: 'UPDATE_GAMESLIST',
  gamesList,
});

export const grabListOfGames = () => (dispatch) => {
  database.ref('games').once('value').then((games) => {
    // go thru each game and grab its id, name, and number of players,
    // but check to make sure the game has not started
    const checkedGames = [];
    const gamesData = games.val();
    for (const i in gamesData) {
      if (gamesData[i].started === false) {
        const gameObj = { gid: i, name: gamesData[i].name };
        checkedGames.push(gameObj);
      }
    }
    dispatch(updateGamesList(checkedGames));
  });
};

export const joinGame = (uid, gid) => (dispatch) => {
  const game = database.ref(`games/${gid}`);
  game.child('/playerPosition').once('value')
  .then((PlayersInGame) => {
    if (!PlayersInGame.val()) {
      game.child('/playerPosition').set([uid]);
      dispatch({ type: 'JOIN_GAME', newPlayers: [uid] });
    } else {
      game.child('/playerPosition').once('value', (snapshot) => {
        if (snapshot.val().indexOf(uid) === -1) {
          const newPlayers = [...snapshot.val(), uid];
          game.child('/playerPosition').set(newPlayers);
          dispatch({ type: 'JOIN_GAME', newPlayers });
        }
      });
    }
  });
};
