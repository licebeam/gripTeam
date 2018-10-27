import React, { Component } from 'react';
import styled from 'styled-components';
import CurrentRankings from './CurrentRankings'
import CenterList from './CenterList';
import User from './User';

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
    flex: 2;
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
    const { highestRated } = this.props
    return (
      <Container>
        <Header>
          Header
        </Header>
        <Middle>
          <div class="current-top">
            <CurrentRankings highestRated={highestRated} />
          </div>
          <div class="current">
            <CenterList />
          </div>

        </Middle>
      </Container>
    )
  }
}

export default Main;