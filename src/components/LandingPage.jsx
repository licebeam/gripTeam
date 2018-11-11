import React, { Component } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  height: 100%;
  width: 100%;
  color: white;
  overflow: auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`
class LandingPage extends Component {
  render() {
    const { genres } = this.props
    return (
      <Container>
        <div>Welcome</div>
      </Container>
    )
  }
}

export default LandingPage;
