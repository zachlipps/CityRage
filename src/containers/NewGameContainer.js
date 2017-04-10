import { connect } from 'react-redux';
import NewGame from '../components/NewGame';
import { createNewGame } from '../actions/newGame';


// function mapStateToProps(state) {
//   return {
//     gamesList: state.gamesList,

//   };
// }

const mapDispatchToProps = dispatch => ({
  createNewGame(...args) { dispatch(createNewGame(...args)); },
});

export default connect(mapDispatchToProps)(NewGame);
