import React, { Component } from 'react';
import styled from 'styled-components';
import GenreList from './GenreList'
import CenterList from './CenterList';
import User from './User';
import Login from './Login'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Container = styled.div`
  background-color: black;
  height: 100vh;
  width: 100vw;
  color: white;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  flex:1;
  width: 100%;
  background-color: black; 
  text-align: center;
  margin: 0 auto;
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
    flex: 4
  }
`
class Main extends Component {
  render() {
    const { genres, text, movieList } = this.props
    return (
      <Router>
        <Container>
          <Header>
            {/* example for craig about redux */}
            {/* {text}
            <button onClick={() => { this.props.changeCraig('You cannot change craig.') }} /> */}
            Header
          </Header>
          <Route exact path="/(|Home)/" component={() => {
            return (
              <Middle >
                <div class="current-top">
                  <GenreList genres={genres} />
                </div>
                <div class="current">
                  <CenterList movieList={movieList} />
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
      </Router>
    )
  }
}

export default Main;