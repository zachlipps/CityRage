export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_PLAYERS_IN_LOBBY':
      console.log(action);
      return action.playerArray;
    default:
      return state;
  }
}
