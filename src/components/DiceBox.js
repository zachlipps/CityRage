import React, { Component } from 'react';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';

class DiceBox extends Component {

  render() {
    const endTurnButton = (this.props.game.chosenOne && this.props.game.chosenOne.uid === this.props.auth.uid && this.props.game.submitted && !this.props.game.kingAttackedOnTurn) ?
      <button onClick={() => { this.props.endTurn(); }}> End Turn</button> : <div />;

    const rolled = this.props.diceBox.one.val;
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>


            <div onClick={() => { this.props.rollDice(this.props.auth.uid, this.props.game.chosenOne.uid); }} style={{ flex: 1, paddingBottom: '5px', flexDirection: 'column', marginBottom: '6px', width: '80px', backgroundColor: '#4990E2', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', boxShadow: 'grey -1px 3px 10px' }}>
              <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: '36px', fontWeight: 'bold' }}>{this.props.game.rollCount}</div>
              <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: '16px' }} >ROLL</div>
            </div>


            {
              (rolled !== '?' && this.props.auth.uid === this.props.game.chosenOne.uid) ?
                <div style={{ display: 'flex', flex: 0.5, width: '80px', backgroundColor: '#73C217', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', boxShadow: 'grey -1px 3px 10px', marginTop: '7px' }}>
                  <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: '13px', alignSelf: 'center', alignItems: 'center' }} onClick={this.props.game.submitted ? null : () => { this.props.submitRoll(); }}>{this.props.game.submitted ? ' SUBMITTED' : 'SUBMIT'}</div>
                </div>
              : <div style={{ display: 'flex', flex: 0.5, width: '80px', backgroundColor: 'white' }} />
              }

          </div>

          <div style={{ flexDirection: 'column', flex: 4, border: '1px solid orange', display: 'flex' }}>
            <div style={{ border: '1px solid purple', flexFlow: 'row-wrap', flex: 1, justifyContent: 'space-around' }}>
              {map(this.props.game.diceBox, (item, key) => <div className={item.selected ? 'dice-toggled' : 'dice'}onClick={() => this.props.selectDice(key, this.props.auth.uid, this.props.game.chosenOne.uid)} key={key}>{item.val}</div>)}
            </div>
          </div>

        </div>
        {endTurnButton}
      </div>
    );
  }
}

export default DiceBox;
