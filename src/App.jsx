import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeText, changeCraig } from './redux/actions'
import Main from './components/Main'

class App extends Component {

  render() {
    const { genres, text, changeCraig, movieList } = this.props
    return (
      <Main
        genres={genres}
        text={text}
        changeCraig={changeCraig}
        movieList={movieList}
      />
    );
  }
}

const mapStateToProps = state => ({
  text: state.text,
  genres: state.genres,
  movieList: state.movieList,
})

const mapDispatchToProps = {
  changeText,
  changeCraig,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
