import React from 'react';
import CurrentUser from '../containers/CurrentUserContainer';
import DiceBox from '../containers/DiceBoxContainer';
import Market from '../containers/MarketContainer';


export default class Game extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <div />

        <CurrentUser auth={this.props.auth} />
        <DiceBox auth={this.props.auth} />
        <Market />

      </div>
    );
  }

}

