import React, { PropTypes } from 'react';
import SignIn from './SignIn';
import CurrentUser from '../containers/CurrentUserContainer';
import Loading from './Loading';
import DiceBox from '../containers/DiceBoxContainer';

const Application = ({ auth, signIn, signOut }) => (
  <main className="Application">
    <div className="Application--sidebar">

      { auth.status === 'ANONYMOUS' && <SignIn signIn={signIn} /> }
      { auth.status === 'SIGNED_IN' && <CurrentUser auth={auth} signOut={signOut} />}
      {/* { auth.status === 'SIGNED_IN' && <NewMessageContainer /> }*/}
      { auth.status === 'AWAITING_AUTH_RESPONSE' && <Loading /> }
    </div>
    <DiceBox />
  </main>
);

Application.propTypes = {
  auth: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Application;
