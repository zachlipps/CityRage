import { connect } from 'react-redux';
import CurrentUser from '../components/CurrentUser';
import {bindActionCreators} from 'redux';
import {increaseHealth, decreaseHealth} from '../actions/stats';

const mapStateToProps = (state) => {  
  return {
    playersOnline: state.playersOnline
  };
};

const mapDispatchToProps = (dispatch) => {
  // return {
  //   increaseHealth(user) { dispatch(increaseHealth(user)); }    
  // };
  return bindActionCreators({increaseHealth, decreaseHealth}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);