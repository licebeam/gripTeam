import React, { Component } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
`
class CurrentRankings extends Component {
  render() {
    return (
      <Container>
        <div>Game Goes Here</div>
      </Container>
    )
  }
}

export default CurrentRankings;