import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeText, changeCraig, getMovies, updateRating, getRating } from './redux/actions'
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
      currentRatings
    } = this.props
    return (
      <Main
        genres={genres}
        text={text}
        changeCraig={changeCraig}
        movieList={movieList}
        getMovies={getMovies}
        updateRating={updateRating}
        getRating={getRating}
        currentRatings={currentRatings}
      />
    );
  }
}

const mapStateToProps = state => ({
  text: state.text,
  genres: state.genres,
  movieList: state.movieList,
  currentRatings: state.currentRatings,
})

const mapDispatchToProps = {
  changeText,
  changeCraig,
  getMovies,
  updateRating,
  getRating,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
