import React, { PropTypes } from 'react';
import SignIn from './SignIn';
import CurrentUser from '../containers/CurrentUserContainer';
import Loading from './Loading';
import DiceBox from '../containers/DiceBoxContainer';
import Game from '../containers/GameContainer';
import Market from '../containers/MarketContainer';

const Application = ({ auth, signIn, signOut }) => (
  <main className="Application">
    <div className="Application--sidebar">

      { auth.status === 'ANONYMOUS' && <SignIn signIn={signIn} /> }
      { auth.status === 'AWAITING_AUTH_RESPONSE' && <Loading /> }
      { auth.status === 'SIGNED_IN' && <CurrentUser auth={auth} signOut={signOut} />}
      { auth.status === 'SIGNED_IN' && <DiceBox />}
      { auth.status === 'SIGNED_IN' && <Game />}
      { auth.status === 'SIGNED_IN' && <Market />}

    </div>

  </main>
);

Application.propTypes = {
  auth: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Application;
