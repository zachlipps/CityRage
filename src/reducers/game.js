export default function (state = [], action) {
  switch (action.type) {
    case 'START_GAME':
      return action.gameData;
    default:
      return state;
  }
}
