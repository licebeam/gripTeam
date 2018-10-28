import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .loading{
    text-align:
    font-size: 3rem;
  }
`
const MovieRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`
const Movie = styled.div`
  margin: 0px 0px 100px 0px;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 600px;
  align-items: center;
  .title{
    height: 40px;
    padding: 10px;
    font-size: 1rem;
  }
  img{
    min-width: 400px;
    min-height: 600px;
    max-width: 400px;
    max-height: 600px;
    object-fit: cover;
  }
    .rating{
    width: 80%;
    padding: 10px;
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    .current-rating{
      flex:1;
      height: 20px;
      padding: 10px;
      color: black;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      background-color: white;
    }
    .up{
      height: 20px;
      flex: 1;
      padding: 10px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      background-color: lightblue; //THIS COLOR MUST CHANGE
      transition: .2s all;
       &:hover{
        cursor: pointer;
        background-color: green;
      }
    }
    .down{
      height: 20px;
      padding: 10px;
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      background-color: orange; //THIS COLOR MUST CHANGE
      transition: .2s all;
      &:hover{
        background-color: red;
      }
    }
  }
`
class CenterList extends Component {

  componentDidMount() {
    if (this.props.movieList && !this.props.movieList.length) {
      this.props.getMovies();
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.movieList);
    if (this.props.movieList.length >= 1) {
      console.log('getting movie ranks')
      this.checkForMovies(this.props.movieList)
    }
  }

  checkForMovies = movies => {
    if (movies.length) {
      movies.map(movie => this.props.getRating(movie.Title));
    } else
      return console.log('no movies to check')
  }

  render() {
    const { updateRating, getRating, currentRatings } = this.props
    return (
      <Container>
        <MovieRow>
          {this.props.movieList.length ? this.props.movieList.map(movie => {
            return (
              <Movie key={this.props.movieList.indexOf(movie)}>
                <div className="title">
                  {movie.Title}
                </div>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images-na.ssl-images-amazon.com/images/I/11382C6KyhL._SX425_.jpg'} alt="" />
                <div className="rating">
                  <div className="up" onClick={() => updateRating(movie.Title, 1)}>Upvote</div>
                  <span className="current-rating">{currentRatings.find(rating => rating.title === movie.Name)}</span>
                  <div className="down" onClick={() => updateRating(movie.Title, -1)}>Downvote</div>
                </div>

              </Movie>
            )
          }
          ) : null}
        </MovieRow>
        {!this.props.movieList.length ? (<div className='loading'>Loading...</div>) : null}
      </Container>
    )
  }
}

export default CenterList;