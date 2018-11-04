import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changeText,
  changeCraig,
  getMovies,
  updateRating,
  getRating,
  logInSet,
  resetMovieRatingList,
  setUserRatings,
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
      userMovies,
      moviesLoading,
      resetMovieRatingList,
      setUserRatings,
    } = this.props
    return (
      <Main
        setUserRatings={setUserRatings}
        user={user}
        userMovies={userMovies}
        genres={genres}
        text={text}
        changeCraig={changeCraig}
        movieList={movieList}
        getMovies={getMovies}
        updateRating={updateRating}
        getRating={getRating}
        currentRatings={currentRatings}
        logInSet={logInSet}
        moviesLoading={moviesLoading}
        resetMovieRatingList={resetMovieRatingList}
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
  userMovies: state.userMovies,
  moviesLoading: state.moviesLoading,
})

const mapDispatchToProps = {
  changeText,
  changeCraig,
  getMovies,
  updateRating,
  getRating,
  logInSet,
  resetMovieRatingList,
  setUserRatings,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
