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
  state = { stateRatings: [], currentPage: 1, userRating: [] };
  componentDidMount() {
    if (this.props.movieList && !this.props.movieList.length) {
      this.props.getMovies();
      this.setState({ currentPage: this.state.currentPage + 1 })
    }
    if (!this.state.stateRatings.length && this.props.currentRatings.length) {
      this.setState({ stateRatings: this.props.currentRatings })
      this.props.getMovies();
      this.props.logInSet()//resets user;
      console.log('current', this.props.currentRatings)
    }
  }

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
