import { connect } from 'react-redux';
import CurrentUser from '../components/CurrentUser';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {  
  return {
    playersOnline: state.playersOnline
  };
};



export default connect(mapStateToProps)(CurrentUser);