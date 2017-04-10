import { connect } from 'react-redux';
import KickKing from '../components/KickKing';
import { kickKing } from '../actions/diceBox';
import { setKing } from '../actions/kickKing';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
  game: state.game,
  auth: state.auth,
});

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      kickKing,
      setKing,
    },
   dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(KickKing);
