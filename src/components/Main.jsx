import React, { Component } from 'react';
import styled from 'styled-components';
import CurrentRankings from './CurrentRankings'
import CenterList from './CenterList';

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
  background-color: darkslategrey; 
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
  overflow: hidden;
  .current-top{
    flex: 1;
  }
  .current{
    flex: 4
  }
  .user{
    flex: 2;
  }
`
class Main extends Component {
  render() {
    return (
      <Container>
        <Header>
          Header
        </Header>
        <Middle>
          <div class="current-top">
            Current Rankings
            <CurrentRankings />
          </div>
          <div class="current">
            New Games
            <CenterList />
          </div>
          <div class="user">
            User Profile
          </div>
        </Middle>
      </Container>
    )
  }
}

export default Main;