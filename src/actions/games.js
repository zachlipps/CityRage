import { database } from '../firebase';


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

