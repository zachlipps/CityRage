import { connect } from 'react-redux';
import CurrentUser from '../components/CurrentUser';
import { bindActionCreators } from 'redux';
import { increaseHealth, decreaseHealth } from '../actions/health';
import { increasePoints, decreasePoints } from '../actions/points';
import { increaseEnergy, decreaseEnergy } from '../actions/energy';
const mapStateToProps = state => ({
  playersOnline: state.playersOnline,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  increaseHealth,
  decreaseHealth,
  increasePoints,
  decreasePoints,
  increaseEnergy,
  decreaseEnergy,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
