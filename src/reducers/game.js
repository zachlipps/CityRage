export default function (state = [], action) {
  switch (action.type) {
    case 'START_GAME':
      return action.gameData;
    case 'UPDATE_CHOSEN_ONE':
      return state;
    default:
      return state;
  }
}
