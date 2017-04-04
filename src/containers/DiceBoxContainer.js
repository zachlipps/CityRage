import { connect } from 'react-redux';
import diceBoxComponent from '../components/DiceBox';
import { rollDice } from '../actions/diceBox';
import { bindActionCreators } from 'redux';

const mapStateToProps = ({ currentDieRoll }) => ({
  currentDieRoll,
});

const mapDispatchToProps = dispatch => bindActionCreators({ rollDice }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(diceBoxComponent);
