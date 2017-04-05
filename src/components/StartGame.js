import React from 'react';

class StartGame extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div><button onClick={() => { this.props.startGame(); }}>Start Game</button>
        <div>Who's going? {this.props.game}</div>
      </div>
    );
  }
}


export default StartGame;
