import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Market from '../components/Market';
import { buyCard, dealCard, resetMarket } from '../actions/market';

function mapStateToProps(state) {
  return {
    market: state.market,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      buyCard,
      dealCard,
      resetMarket,
    },
   dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Market);

