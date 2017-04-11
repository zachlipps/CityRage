import React from 'react';

export default class KickKing extends React.Component {
  render() {
    // console.log('kick king props', this.props);
    return (
      <div>
        {/* {this.props.game.king.uid === this.props.auth.uid ?
        (<div>
        Leave?
        <button>Yes</button>
          <button>No</button>
        </div>) : (<div />)}*/}

        <div>
        Leave?
        <button onClick={() => this.props.setKing()}>Yes</button>
          <button>No</button>
        </div>


      </div>
    );
  }
}
