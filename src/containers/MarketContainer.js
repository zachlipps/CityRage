import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Market from '../components/Market';
import { buyCard } from '../actions/market';
import { dealCard } from '../actions/market';

function mapStateToProps(state) {
  return {
    market: state.market,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ buyCard, dealCard }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Market);

