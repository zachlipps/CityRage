import { connect } from 'react-redux';
import CurrentUser from '../components/CurrentUser';
import { bindActionCreators } from 'redux';
import { increaseHealth, decreaseHealth } from '../actions/health';
import { increasePoints, decreasePoints } from '../actions/points';
import { increaseEnergy, decreaseEnergy } from '../actions/energy';
import { joinGame, leaveGame } from '../actions/enterGame';

const mapStateToProps = state => ({
  playersOnline: state.playersOnline,
  PlayersInGame: state.PlayersInGame,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  increaseHealth,
  decreaseHealth,
  increasePoints,
  decreasePoints,
  increaseEnergy,
  decreaseEnergy,
  joinGame,
  leaveGame,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
