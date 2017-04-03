import React, { PropTypes } from 'react';
import {database} from '../firebase';
import User from './User';

class CurrentUser extends React.Component {
  constructor(props) {
    super(props);  
  }

  render() {        
    const { auth, signOut } = this.props;    
    return (
    <div className="CurrentUser">
      <img
        className="CurrentUser--photo"
        src={ auth.photoURL }
        alt={ auth.displayName }
      />
      <div className="CurrentUser--identification">
        <h3 className="CurrentUser--displayName">{ auth.displayName }</h3>
        <p className="CurrentUser--email">{ auth.email }</p>
        <button
          className="CurrentUser--signout"          
          onClick={()=>{ signOut(auth.uid); }}
        >
        Sign Out
        </button>

      {/*{this.props.playersOnline.map(user => {
        return <p>user</p>; 
      })}*/}

      {this.props.playersOnline.map(user => {
        return <div key={user}>{user}</div>;
      })}
        
                
          
      </div>
    </div>
    );
  }
}


CurrentUser.propTypes = {
  auth: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired
  }),
  signOut: PropTypes.func.isRequired
};




export default CurrentUser;