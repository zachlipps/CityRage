export default function (state = [], action) {
  switch (action.type) {
    case 'START_GAME':
      return action.gameData;
    case 'UPDATE_CHOSEN_ONE':
      console.log('update chosen one', state)
      return state
    default:
      return state;
  }
}
