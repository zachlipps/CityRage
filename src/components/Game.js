import React from 'react';
import StartGame from './StartGame';

export default class Game extends React.Component {
  render() {
    console.log();
    return (
      <div><StartGame startGame={this.props.startGame} /></div>
    );
  }

}

