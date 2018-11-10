import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'


const HeaderContainer = styled.div`
  flex:1;
  width: 100%;
  background-color: #323232; 
  text-align: center;
  margin: 0 auto;
  display: flex;
  border-bottom: 6px solid #c79843;
`
const SearchBar = styled.div`
   @media (max-width: 700px) { 
     height: 80px; 
  }
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 20px;
  .navigation{
    .link{
        /* this is a mobile friendly media query  */
  /* if the screen is less the 700px wide it will inherit this style */
   @media (max-width: 700px) {  
     font-size: .8rem;
  }
      flex: 1;
      font-size: 1.4rem;
      margin-right: 20px;
    }
  }
  .eval-logo{
    flex: 3;
    width: 100%;
    height: 100%;
    content: url('https://imgur.com/CAVcTE8');
  }
  .user-icon{
    flex: 1;
    .login{
     flex: 1;
     font-size: 1.4rem;
    }
  }
  input{
    margin-left: auto;
    width: 200px;
    border: none;
    height: 30px;
    font-size: 1.2rem;
  }
  .user-profile-photo{
     @media (max-width: 700px) {  
      height: 30px;
     width: 30px; 
  }
    height: 50px;
    width: 50px;   
    display: flex;
    color: white;
    img{
      height: 100%;
      height: 100%;
      border: 2px solid white;
      border-radius: 50%;
    }
  }
`

class Header extends Component {
  render() {
    const { user, getMovies, updateSearchTerm, resetMovieRatingList } = this.props;
    return (
      <HeaderContainer>
        <SearchBar>
          <div className="navigation">
            <Link className="link" to="/Home">Home</Link>
            <Link className="link" to="/Top">Top Movies</Link>
          </div>
          <div className="eval-logo">EVAL</div>
          <div className="user-icon">
            {user && user.profilePhoto ? (
              <div className="user-profile-photo">
                <img src={user.profilePhoto} alt="" />
                <span>{user.displayName}</span>
              </div>
            ) : (
                <a className="login" href="Login">Login</a>
              )
            }
          </div>
          <input type="text"
            placeholder='Search'
            onChange={(e) =>
              updateSearchTerm(e)
            }
            onKeyPress={e => {
              if (e.key === 'Enter') {
                resetMovieRatingList();
                this.props.getMovies(this.props.searchTerm);
              }
            }}
          />
        </SearchBar>
      </HeaderContainer>
    )
  }
}

export default Header