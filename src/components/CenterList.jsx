import React, { Component } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  background-color: grey;
  height: 100%;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
`
class CenterList extends Component {
  render() {
    return (
      <Container>
        <div>Movies will go here</div>
      </Container>
    )
  }
}

export default CenterList;