import keys from 'lodash/keys';

export const endTurn = user => ({
  type: 'END_TURN',
  user,
});


// we need to have an array of the player id's when enter the game and then rotate through this array whenever end turn is called;
  // end turn should do these three things:
    // reset the dice
    // make the next player in the array have the turn
    // set the current player in game state to the next player


export const endTurn = () => (dispatch) => {
  database.ref('/users').once('value', snapshot => (snapshot.val()))
    .then(ukeys => ukeys.val()[keys(ukeys.val())[0]])
    .then((userID) => { database.ref('/currentPlayer').set({ displayName: userID.displayName, uid: userID.uid }); return userID.displayName; })
    .then(user => dispatch(startGameAction(user)));
};


//change this so ppl can enter the game 