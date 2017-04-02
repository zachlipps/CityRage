import React, { PropTypes } from 'react';
import {database} from '../firebase';



const CurrentUser = ({ auth, signOut }) => {

  
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
          onClick={()=>{ signOut(auth.uid); console.log('im gere', auth); }}
        >
          Sign Out
        </button>

        <button onClick={()=>{
          database.ref('/users').on('value', (snapshot) => {
            snapshot.forEach(user =>{          
              console.log('user', user.key);
              console.log('value', user.val().currentlyOn); 
              if (user.val().currentlyOn) {
                console.log('im here');
                return <div>user.val().displayName</div>;
              }
            }); 
          });
        }}>Test</button>
        
      </div>
    </div>
  );
};

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