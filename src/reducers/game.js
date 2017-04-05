export default function (state = [], action) {
  switch (action.type) {
    case 'START_GAME':
      return action.user;
    default:
      return state;
  }
}
