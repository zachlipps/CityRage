import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Lobby from '../components/Lobby';
import { playersInLobby } from '../actions/lobby';
import { startGame } from '../actions/game';

const mapStateToProps = state => ({
  lobby: state.lobby,

});

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      playersInLobby,
      startGame,
    },
   dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Lobby);
