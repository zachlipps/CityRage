import { connect } from 'react-redux';
import StartGame from '../components/StartGame';
import { startGame } from '../actions/game';


const mapStateToProps = state => ({
  game: state.game,
});

const mapDispatchToProps = dispatch => ({
  startGame() { dispatch(startGame()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(StartGame);
