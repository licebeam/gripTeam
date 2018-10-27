import React, { Component } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  background-color: pink;
  height: 100%;
  width: 100%;
  color: white;
  overflow: auto;
`
const Game = styled.div`
  width: 100%;
  background-color: white;
  color: black;
  height: 100px;
  .game-image{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover{
    background-color: grey;
  }
`
class GenreList extends Component {
  render() {
    const { highestRated } = this.props
    return (
      <Container>
        {highestRated ? highestRated.map(item => {
          return (
            <Game image={item.image}>
              {item.title}
              {item.rating}
            </Game>)
        }
        ) : null}
      </Container>
    )
  }
}

export default GenreList;