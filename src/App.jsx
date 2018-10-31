import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changeText,
  changeCraig,
  getMovies,
  updateRating,
  getRating,
  logInSet,
} from './redux/actions'
import Main from './components/Main'

class App extends Component {

  render() {
    const {
      genres,
      text,
      changeCraig,
      movieList,
      getMovies,
      updateRating,
      getRating,
      currentRatings,
      logInSet,
      user,
    } = this.props
    return (
      <Main
        user={user}
        genres={genres}
        text={text}
        changeCraig={changeCraig}
        movieList={movieList}
        getMovies={getMovies}
        updateRating={updateRating}
        getRating={getRating}
        currentRatings={currentRatings}
        logInSet={logInSet}
      />
    );
  }
}

const mapStateToProps = state => ({
  text: state.text,
  genres: state.genres,
  movieList: state.movieList,
  currentRatings: state.currentRatings,
  user: state.user,
})

const mapDispatchToProps = {
  changeText,
  changeCraig,
  getMovies,
  updateRating,
  getRating,
  logInSet,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
