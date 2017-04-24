import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Loading from './Loading';
import Lobby from '../containers/LobbyContainer';
import Home from '../containers/HomeContainer';
import NewGame from '../containers/NewGameContainer';
import GamesList from '../containers/GamesListContainer';
import Rules from '../components/Rules';
import '../assets/App.css';

const Application = ({ auth, signIn, signOut, game }) => (
  <Router>
    <main className="Application">
      <div>
        <div className="nav-container">
          <div style={{ alignSelf: 'center', fontWeight: 'bold' }} ><Link className="nav-link" to="/">CITYRAGE</Link></div>
          <div style={{ alignSelf: 'center', float: 'left' }} ><Link className="nav-link" to="/">Home</Link></div>
          { auth.status === 'ANONYMOUS' && <div style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', float: 'left' }}><SignIn signIn={signIn} /></div> }
          { auth.status === 'SIGNED_IN' && <div style={{ alignSelf: 'center', display: 'flex', alignItems: 'center' }} onClick={() => { auth ? signOut(auth.uid) : null; }}>Sign Out</div>}
        </div>
        { auth.status === 'AWAITING_AUTH_RESPONSE' && <Loading /> }

        <Route exact path="/" component={Home} />
        <Route path="/newgame" component={NewGame} />
        <Route exact path="/games-list" component={GamesList} />
        <Route path="/games-list/lobby/:game" component={Lobby} />
        <Route path="/rules" component={Rules} />
      </div>
    </main>
  </Router>
);


export default Application;

