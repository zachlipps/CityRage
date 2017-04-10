import React from 'react';
import GamesList from '../containers/GamesListContainer';
import NewGame from '../containers/NewGameContainer';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joined: false,
      cont: false,
      new: false,
    };
  }

  joinedClick() {
    this.setState({ joined: true });
  }

  render() {
    const test = (this.state.joined === false && this.state.cont === false && this.state.new === false);
    return (

      <div>
        <h1> Hi {this.props.auth.displayName.split(' ')[0]}! </h1>

        { test &&
          <div>
            <p><button>Continue Game</button></p>
            <p><button onClick={() => { this.joinedClick(); }}>Join Game</button></p>
            <p><button>New Game</button> </p>
          </div>
          }

        <NewGame />

        <GamesList />

        <p><button onClick={() => { this.props.signOut(this.props.auth.uid); }}> Sign Out</button></p>
      </div>
    );
  }
}

export default Home;
