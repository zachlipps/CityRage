import React from 'react';
import StartGame from './StartGame';
import CurrentUser from '../containers/CurrentUserContainer';
import DiceBox from '../containers/DiceBoxContainer';
import Market from '../containers/MarketContainer';


export default class Game extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <div><StartGame startGame={this.props.startGame} /></div>

        <Market />
        <CurrentUser auth={this.props.auth} />
        <DiceBox dicey={this.props.game.diceBox} />
      </div>
    );
  }

}

