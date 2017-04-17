import React from 'react';
import CurrentUser from '../containers/CurrentUserContainer';
import DiceBox from '../containers/DiceBoxContainer';
import Market from '../containers/MarketContainer';
import KickKing from '../containers/kickKingContainer';

import map from '../assets/media/sf-map.png';


export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.checkKing = this.checkKing.bind(this);
  }


  checkKing() {
    let kingAttack = false;
    if (this.props.game.king !== undefined) {
      kingAttack = this.props.auth.uid === this.props.game.king.uid &&
        this.props.game.kingAttackedOnTurn === true &&
        this.props.game.king !== null &&
        this.props.game.chosenOne.uid !== this.props.auth.uid;
    }
    return kingAttack;
  }

  render() {
    // console.log('Game Component', this.props, this.props.game.chosenOne !== this.props.auth.uid);
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <div style={{ position: 'relative', flex: 1, display: 'flex', alignContent: 'center' }}>

          <div><img style={{ width: '1150', height: '190px' }} src={map} /></div>

          { this.props.game.king.uid && <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              position: 'absolute',
              left: '45%',
              top: '12%',
            }}
          >
            <img
              style={{ width: '100px',
                boxShadow: 'grey -1px 3px 10px',
                height: '100px',
                borderRadius: '100%',
                borderColor: 'white',
                borderWidth: '2px',
              }} src={this.props.game.king.photoURL}
            />
            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '30px' }}>{this.props.game.king.displayName}</div>
          </div>}

        </div>

        <Market />
        {this.checkKing() && <KickKing />}

        <CurrentUser auth={this.props.auth} />
        {/* <DiceBox auth={this.props.auth} />*/}


      </div>
    );
  }

}

