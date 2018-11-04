import React, { Component } from 'react';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';
import noPoster from '../images/noposter.png';

const Container = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
  margin: 0 auto;
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  /* this is a mobile friendly media query  */
  /* if the screen is less the 700px wide it will inherit this style */
   @media (max-width: 700px) {  
     grid-template-columns: 1fr;
  }
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
    font-size: .8rem;
  }
  img{
    min-width: 300px;
    min-height: 500px;
    max-width: 300px;
    max-height: 500px;
    object-fit: cover;
  }
    .rating{
    width: 60%;
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
  state = { stateRatings: [], currentPage: 1 };

  componentDidMount() {
    if (this.props.movieList && !this.props.movieList.length) {
      this.props.getMovies();
      this.setState({ currentPage: this.state.currentPage + 1 })
    }
    if (!this.state.stateRatings.length && this.props.currentRatings.length) {
      this.setState({ stateRatings: this.props.currentRatings })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.setState({ currentPage: 1 })
    }
    if (this.state.stateRatings.length !== this.props.currentRatings.length) {
      this.setState({ stateRatings: this.props.currentRatings })
    }
  }

  updatePage = () => {
    if (this.state.currentPage !== 1) {
      this.props.getMovies(this.props.searchTerm, this.state.currentPage);
    }
    this.setState({ currentPage: this.state.currentPage + 1 })
  }

  updateObjectInArray = (array, movieToUpdate) => {
    this.setState({
      stateRatings:
        array.map((item) => {
          if (item !== movieToUpdate) {
            return item
          }
          return {
            ...item,
            ...movieToUpdate
          }
        })
    })
  }
  render() {
    const { updateRating, getRating, currentRatings, movieList } = this.props
    console.log('currentRatings', this.state.stateRatings)
    return (
      < Container >
        {!this.props.moviesLoading ? null : (<div className='loading'>Loading...</div>)}
        <div className="test">
          <MovieRow>
            {movieList && movieList.length ? movieList.map(movie => {
              let movieRating = this.state.stateRatings.find(item => item.title === movie.Title);
              return (
                <Movie key={movieList.indexOf(movie)}>
                  <div className="title">
                    {movie.Title}
                  </div>
                  <img src={movie.Poster !== 'N/A' ? movie.Poster : noPoster} alt="" />
                  <div className="rating">
                    <div className="up"
                      onClick={() => {
                        updateRating(movie.Title, 1);
                        this.updateObjectInArray(this.state.stateRatings,
                          { rating: movieRating.rating += 1, title: movie.Title });
                      }}>Upvote</div>
                    <span className="current-rating">{movieRating ? this.state.stateRatings.find(item => item.title === movie.Title).rating : 0}</span>
                    <div className="down" onClick={() => { updateRating(movie.Title, -1); this.updateObjectInArray(this.state.stateRatings, { rating: movieRating.rating -= 1, title: movie.Title }); }}>Downvote</div>
                  </div>

                </Movie>
              )
            }
            ) : null}
          </MovieRow>
          <Waypoint
            onEnter={this.updatePage}
          >
            {/* <div>Hey</div> */}
          </Waypoint>
        </div>

      </Container >
    )
  }
}

export default CenterList;