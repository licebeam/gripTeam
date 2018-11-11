import React, { Component } from 'react';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';
import noPoster from '../images/noposter.png';
import { ThumbsUp } from 'styled-icons/fa-regular/ThumbsUp'
import { ThumbsDown } from 'styled-icons/fa-regular';
import { SelfBuildingSquareSpinner } from 'react-epic-spinners'

const UpVote = styled(ThumbsUp)`
  color: whitesmoke;
`
const DownVote = styled(ThumbsDown)`
  color: whitesmoke;
`

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
    height: 100%;
    width: 100%;
    justify-content: center;
    background-color: black;
    opacity: 0.5;
    z-index: 10;
    .spin{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
const MovieRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
    justify-content: center;
    .current-rating{
      flex:1;
      height: 20px;
      padding: 10px;
      color: gold;
      justify-content: center;
      flex-direction: column;
      text-align: center;
    }
    .up{
      height: 20px;
      flex: 1;
      padding: 10px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      transition: .2s all;
       &:hover{
        cursor: pointer;
        background-color: blue;
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
      transition: .2s all;
      &:hover{
        background-color: red;
      }
    }
  }
`
class CenterList extends Component {
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.setState({ currentPage: 1 })
    }
    if (this.state.stateRatings.length !== this.props.currentRatings.length) {
      this.setState({ stateRatings: this.props.currentRatings })
    }
    if (this.props.userMovies !== prevProps.userMovies) {
      this.setState({ userRating: this.props.userMovies });
    }
  }

  updatePage = () => {
    if (this.state.currentPage !== 1) {
      this.props.getMovies(this.props.searchTerm, this.state.currentPage);
    }
    this.setState({ currentPage: this.state.currentPage + 1 })
  }

  updateObjectInArray = (array, movieToUpdate) => {
    console.log('testing ', movieToUpdate)
    this.setState({
      stateRatings:
        array.map((item) => {
          if (item.title !== movieToUpdate.title) {
            return item
          }
          return {
            ...item,
            ...movieToUpdate
          }
        })
    })
    console.log(this.state.stateRatings)
  }

  render() {
    const {
      updateRating,
      getRating,
      currentRatings,
      movieList,
      user,
      userMovies,
      setUserRatings
    } = this.props
    console.log(this.props.moviesLoading)
    return (
      < Container >
        {!this.props.moviesLoading ? null : (<div className='loading'><div className="spin"><SelfBuildingSquareSpinner /></div></div>)}
        <div className="test">
          <MovieRow>
            {userMovies && movieList && movieList.length ? movieList.map(movie => {
              const adjustedTitle = movie.Title + ' ' + movie.Year;
              let movieRating = this.state.stateRatings.find(item => item.title === adjustedTitle);
              const movieToRate = this.state.stateRatings.reverse().find(movie => movie.title === adjustedTitle.replace(/\//g, ''));
              let userMovieRating = this.state.userRating.slice().reverse().find(item => item && item.title && movieToRate !== undefined ? item.title === movieToRate.title && movieToRate.rating : null);
              let realVal = userMovieRating !== undefined ? userMovieRating : { rating: undefined }
              const checkRatingUp = realVal.rating === 'down' && realVal.rating !== 'up' || realVal.rating === undefined;
              const checkRatingDown = realVal.rating === 'up' && realVal.rating !== 'down' || realVal.rating === undefined;
              console.log(this.props.userRating)
              return (
                <Movie key={movieList.indexOf(movie)}>
                  <div className="title">
                    {adjustedTitle}
                  </div>
                  <img src={movie.Poster !== 'N/A' ? movie.Poster : noPoster} alt="" />
                  {user.email && userMovies.length >= 1 ?
                    !movieToRate && realVal ? (
                      <div className="rating">
                        <SelfBuildingSquareSpinner />
                      </div>
                    ) : (
                        !this.props.moviesLoading ? (
                          <div className="rating">
                            {checkRatingUp ? (
                              <div className="up"
                                onClick={() => {
                                  updateRating(adjustedTitle, 1, user, 'up');
                                  setUserRatings([adjustedTitle.replace(/\//g, '')]);
                                  this.updateObjectInArray(this.state.stateRatings,
                                    { rating: movieRating.rating += 1, title: adjustedTitle, type: 'up' });
                                }}><UpVote /></div>
                            ) : null}
                            <span className="current-rating">{movieRating && this.state.stateRatings.length ? this.state.stateRatings.find(item => item.title === adjustedTitle).rating : 0}</span>
                            {checkRatingDown ? (
                              <div className="down" onClick={() => {
                                updateRating(adjustedTitle, -1, user, 'down');
                                this.updateObjectInArray(this.state.stateRatings, { rating: movieRating.rating -= 1, title: adjustedTitle, type: 'down', });
                                setUserRatings([adjustedTitle.replace(/\//g, '')]);
                              }}><DownVote /></div>
                            ) : null}
                          </div>
                        )
                          : (<div className="rating"><SelfBuildingSquareSpinner /></div>)
                      )
                    : (<div className="rating">
                      <span className="current-rating">{movieRating && this.state.stateRatings.length ? this.state.stateRatings.find(item => item.title === adjustedTitle).rating : 0}</span>
                    </div>
                    )}
                </Movie>
              )
            }
            ) : null}
          </MovieRow>
          <Waypoint
            onEnter={this.updatePage}
          >
          </Waypoint>
        </div>

      </Container >
    )
  }
}

export default CenterList;