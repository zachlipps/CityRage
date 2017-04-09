import { connect } from 'react-redux';
import GamesList from '../components/GamesList';
import { grabListOfGames } from '../actions/games';


function mapStateToProps(state) {
  return {
    gamesList: state.gamesList,

  };
}

const mapDispatchToProps = dispatch => ({
  grabListOfGames() { dispatch(grabListOfGames()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
