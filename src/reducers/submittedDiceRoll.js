export default function (state = false, action) {
  console.log('SET SUBMIT', action.type)
  switch (action.type) {
    case 'SET_SUBMITTED':
      return action.hasBeenSubmitted
    default:
      return state
  }
}