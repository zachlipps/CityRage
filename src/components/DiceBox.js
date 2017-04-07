import React, { Component } from 'react';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';

class DiceBox extends Component {
  render() {
    const rolled = this.props.diceBox.one.val;
    // console.log('dicebox component', this.props);
    return (
      <div>
        <div style={{ display: 'flex', border: '1px solid black', width: '400px', height: '150px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid green', flex: 1 }}>
            <div style={{ flex: 1 }}> DICEBOX </div><button onClick={() => { this.props.rollDice(); }}>Roll {this.props.rollCount}</button>
            {rolled !== '?' ? <div><div style={{ flex: 1 }}> <hr /> </div><button onClick={() => { this.props.submitRoll(); console.log('hide button after pressing'); }}>Submit</button></div> : <div />}
          </div>

          <div style={{ flexDirection: 'column', flex: 4, border: '1px solid orange', display: 'flex' }}>
            <div style={{ border: '1px solid purple', flexFlow: 'row-wrap', flex: 1, justifyContent: 'space-around' }}>
              {map(this.props.diceBox, (item, key) => <div onClick={() => this.props.selectDice(key)} key={key}>{item.val}</div>)}
            </div>
          </div>

        </div>
        <button onClick={() => { console.log('implement me!'); }}>End Turn</button>
      </div>
    );
  }
}

export default DiceBox;
