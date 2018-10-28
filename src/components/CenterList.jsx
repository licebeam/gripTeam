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

  checkForMovies = movies => {
    if (movies.length) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <Container>
        {this.checkForMovies(this.props.movieList) ? this.props.movieList.map(movie => {
          return (
            <div>
              {movie.title}
            </div>
          )
        }
        ) : null}
        <div>Movies will go here</div>
      </Container>
    )
  }
}

export default CenterList;