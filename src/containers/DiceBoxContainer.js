import { connect } from 'react-redux';
import diceBoxComponent from '../components/DiceBox';
import { rollDice, selectDice, submitRoll, endTurn } from '../actions/diceBox';

const mapStateToProps = state => ({
  diceBox: state.diceBox,
  rollCount: state.rollCount,
});


const mapDispatchToProps = dispatch => ({
  rollDice() { dispatch(rollDice()); },
  selectDice(...args) { dispatch(selectDice(...args)); },
  submitRoll() { dispatch(submitRoll()); },
  endTurn() { dispatch(endTurn()); },
});


export default connect(mapStateToProps, mapDispatchToProps)(diceBoxComponent);
