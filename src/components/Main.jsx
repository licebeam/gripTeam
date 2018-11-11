import React, { Component } from 'react';
import styled from 'styled-components';
import GenreList from './GenreList'
import CenterList from './CenterList';
import TopRated from './TopRated';
import User from './User';
import Login from './Login';
import Header from './Header';
import { BrowserRouter as Router, Route, Link, location } from "react-router-dom";
import { withRouter } from 'react-router-dom';
const Container = styled.div`
  background-color: black;
  height: 100vh;
  width: 100vw;
  color: green;
  display: flex;
  flex-direction: column;
  a {
    color: white; //CHANGE COLORS
    text-decoration: none;
  }
  a:hover 
  {
     color: orange; //CHANGE COLORS
     text-decoration:none; 
     cursor:pointer;  
  }
`
const Middle = styled.div`
  flex:8;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: darkslategrey; 
  text-align: center;
  margin: 0 auto;
`
class Main extends Component {
  state = { loadRatings: true, searchTerm: '' };

  componentDidMount() {
    // TODO FIX LOGIN BUG
    if (this.props.user.email === null) {
      this.props.logInSet();
    }
  }

  updateSearchTerm = (e) => {
    //ADD PAGE RESET
    this.setState({ searchTerm: e.target.value })
  }

  render() {
    const {
      genres,
      text,
      movieList,
      getMovies,
      updateRating,
      getRating,
      currentRatings,
      user,
      moviesLoading,
      resetMovieRatingList,
      setUserRatings,
      userMovies,
      logInSet,
      getTopRated,
    } = this.props
    return (
      < Router>
        <Container>
          <Header
            user={user} getMovies={getMovies}
            updateSearchTerm={this.updateSearchTerm}
            searchTerm={this.state.searchTerm}
            resetMovieRatingList={resetMovieRatingList}
          />
          <Route exact path="/(|Home)/" render={() =>
            <Middle >
              {/* <div className="current-top">
                  <GenreList genres={genres} />
                </div> */}
              <CenterList
                user={user}
                userMovies={userMovies}
                setUserRatings={setUserRatings}
                movieList={movieList}
                getMovies={getMovies}
                updateRating={updateRating}
                getRating={getRating}
                currentRatings={currentRatings}
                moviesLoading={moviesLoading}
                searchTerm={this.state.searchTerm}
                logInSet={logInSet} //check for page mount reset loaded user
              />
            </Middle>
          } />
          <Route exact path="/Top" render={() =>
            <Middle >
              <TopRated
                user={user}
                userMovies={userMovies}
                setUserRatings={setUserRatings}
                movieList={movieList}
                getTopRated={getTopRated}
                updateRating={updateRating}
                getRating={getRating}
                currentRatings={currentRatings}
                moviesLoading={moviesLoading}
                searchTerm={this.state.searchTerm}
                logInSet={logInSet} //check for page mount reset loaded user
              />
            </Middle>
          } />
          <Route exact path="/User" render={() => {
            return (
              <Middle>
                <User />
              </Middle>
            )
          }} />
          <Route exact path="/Login" render={() => {
            return (
              <Middle>
                <Login />
              </Middle>
            )
          }} />
        </Container>
      </Router >
    )
  }
}

export default Main;
