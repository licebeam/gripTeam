import React, { Component } from 'react';
import styled from 'styled-components';
import GenreList from './GenreList'
import CenterList from './CenterList';
import User from './User';
import Login from './Login';
import Header from './Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
  .current-top{
    flex: 1;
  }
  .current{
    flex: 9
  }
`
class Main extends Component {
  state = { searchTerm: '', loadRatings: true };

  componentDidMount() {

    //TODO FIX LOGIN BUG
    // if (!this.props.user.displayName.length) {
    //   this.props.logInSet()
    // }
  }

  render() {
    const { genres, text, movieList, getMovies, updateRating, getRating, currentRatings, user } = this.props
    return (
      < Router >
        <Container>
          <Header user={user} />
          <Route exact path="/(|Home)/" component={() => {
            return (
              <Middle >
                <div className="current-top">
                  <GenreList genres={genres} />
                </div>
                <div className="current">
                  <CenterList
                    movieList={movieList}
                    getMovies={getMovies}
                    updateRating={updateRating}
                    getRating={getRating}
                    currentRatings={currentRatings}
                  />
                </div>
              </Middle>
            )
          }} />
          <Route exact path="/User" component={() => {
            return (
              <Middle>
                <User />
              </Middle>
            )
          }} />
          <Route exact path="/Login" component={() => {
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
