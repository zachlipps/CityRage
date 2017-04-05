import React, { Component } from 'react';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.cardStyle = { margin: '10px', width: '75px', border: '1px solid black' };
  }

  createMarket() {
    return this.props.market.face_up.map(card => (
      <div key={card.title} onClick={() => this.props.buyCard(card.title)} className="market-card" style={this.cardStyle}> {card.title} </div>
      ));
  }

  render() {
    return (
      <div className="market-container" style={{ marginBottom: '25px', margin: '10px', border: '1px solid black' }}>
        <div style={this.cardStyle}>Deck</div>
        <button onClick={() => this.props.dealCard()}>DealNewCard</button>
        { this.createMarket() }
        <div style={this.cardStyle}>Discar Pile</div>
      </div>
    );
  }
}

export default Deck;
