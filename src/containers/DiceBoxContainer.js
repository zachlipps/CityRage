import { connect } from 'react-redux';
import DiceBox from '../components/DiceBox';
import { bindActionCreators } from 'redux';

const mapStateToProps = ({ currentDieRoll }) => ({
  currentDieRoll,
});

// mapDispatchToProps = (dispatch) => {}
// map all of the actions

export default connect(mapStateToProps)(DiceBox);
