import { connect } from 'react-redux';
import diceBoxComponent from '../components/DiceBox';
import { rollDice, selectDice } from '../actions/diceBox';

const mapStateToProps = state => ({
  diceBox: state.diceBox,
});


const mapDispatchToProps = dispatch => ({
  rollDice() { dispatch(rollDice()); },
  selectDice(...args) { dispatch(selectDice(...args)); },
});


export default connect(mapStateToProps, mapDispatchToProps)(diceBoxComponent);
