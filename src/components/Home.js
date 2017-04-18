import React from 'react';
import '../assets/home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joined: false,
      cont: false,
      new: false,
    };
  }

  joinedClick() {
    this.setState({ joined: true });
  }

  renderSignOut() {
    return (
      <div className="nav-link" onClick={() => { this.props.auth ? this.props.signOut(this.props.auth.uid) : null; }}>
        Sign Out
      </div>
    );
  }

  render() {
    // is the following line still necessary ?
    // const test = (this.state.joined === false && this.state.cont === false && this.state.new === false);
    return (
      <div className="reception-container">


        <div className="columnA">
          <div className="welcome">
            Welcome to City Rampage!
            { this.props.auth.status === 'SIGNED_IN' && this.renderSignOut()}
          </div>

          <div className="credits">
            <div style={{ fontWeight: 'bold' }}>Credits</div>
            <div className="authors">
              <div>Zach Lipps</div>
              <div>Derek Alia</div>
              <div>Jaime Pericas</div>
              <div>Westin Funk</div>
            </div>
            <div className="inspiration">
              <div style={{ fontWeight: 'bold' }}>Based on King of Tokyo</div>
              <div>by Richard Garfield</div>
            </div>
          </div>
        </div>

        <div className="columnB">
          <div className="rules">Game Rules</div>
        </div>

      </div>
    );
  }
}

export default Home;
