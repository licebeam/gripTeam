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
const Genre = styled.div`
  width: 300px;
  margin: auto;
  background-color: #d9e4e5;
  color: black;
  height: 100px;
  cursor: pointer;
  &:hover{
    background-color: #c5d0d1;
  }
`
class GenreList extends Component {
  render() {
    const { genres } = this.props
    return (
      <Container>
        {genres ? genres.map(item => {
          return (
            <Genre key={item.title}>
              {item.title}
            </Genre>)
        }
        ) : null}
      </Container>
    )
  }
}

export default GenreList;
