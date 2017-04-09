import React from 'react';

export default class GamesList extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        Hi this is the gameList

        <button onClick={() => this.props.grabListOfGames()}>get the games</button>

        <div>
          {this.props.gamesList.map(gameItem => <div style={{ border: '1px solid black', width: ' 200px' }} key={gameItem.gid}><p>{gameItem.gid}</p><p>{gameItem.name}</p></div>)}
        </div>
      </div>
    );
  }
}
