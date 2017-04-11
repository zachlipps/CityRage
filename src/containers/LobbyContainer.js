import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Lobby from '../components/Lobby';
import { playersInLobby } from '../actions/lobby';
import { startGame } from '../actions/game';
import { leaveGame } from '../actions/games';

const mapStateToProps = state => ({
  lobby: state.lobby,
  auth: state.auth,

});

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      playersInLobby,
      startGame,
      leaveGame,
    },
   dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Lobby);
