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
class User extends Component {

  render() {
    const { user } = this.props
    return (
      <Container>
      </Container>
    )
  }
}

export default User;