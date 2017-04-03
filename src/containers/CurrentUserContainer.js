import { connect } from 'react-redux';
import CurrentUser from '../components/CurrentUser';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
  console.log('this is container', state.playersOnline);
  return {
    playersOnline: state.playersOnline
  };
};



export default connect(mapStateToProps)(CurrentUser);