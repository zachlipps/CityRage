import { connect } from 'react-redux';
import CurrentUser from '../components/CurrentUser';
import {bindActionCreators} from 'redux';
import {increaseHealth, decreaseHealth} from '../actions/health';
import {increasePoints, decreasePoints} from '../actions/points';

const mapStateToProps = (state) => {  
  return {
    playersOnline: state.playersOnline
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    increaseHealth, 
    decreaseHealth,
    increasePoints, 
    decreasePoints,
  }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);