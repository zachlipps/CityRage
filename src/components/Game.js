import React from 'react';
import CurrentUser from '../containers/CurrentUserContainer';
import DiceBox from '../containers/DiceBoxContainer';
import Market from '../containers/MarketContainer';
import KickKing from '../containers/kickKingContainer';

export default class Game extends React.Component {

  // componentWillMount() {
  //   this.props.marketListener();
  // }

  render() {
    // console.log(this.props);
    return (
      <div>
        <div />
        <KickKing />
        <CurrentUser auth={this.props.auth} />
        <DiceBox auth={this.props.auth} />
        <Market />

      </div>
    );
  }

}

