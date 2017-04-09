import React from 'react';


class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      numberOfPlayers: 0,
    };
  }

  handleName() {

  }

  render() {
    // push new game and give it a name
    return (
      <div>

        <button onClick={() => { this.props.createNewGame(name, numberOfPlayers); }} />
      </div>
    );
  }
}
