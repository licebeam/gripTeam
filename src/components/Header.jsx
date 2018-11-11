import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Loader } from 'styled-icons/feather/Loader'
import { User } from 'styled-icons/fa-solid/User'
import { withRouter } from 'react-router-dom'


const LoginIcon = styled(User)`
  color: whitesmoke;
`
const Spinner = styled(Loader)`
  color: whitesmoke;
  height: 20px;
  width: 60px;
  margin: 10px;
  text-align: center;
`

const HeaderContainer = styled.div`
  flex:1;
  width: 100%;
  background-color: black; 
  margin: 0 auto;
  display: flex;
  border-bottom: 6px solid #c79843;
`
const SearchBar = styled.div`
   @media (max-width: 700px) { 
    flex: 1;
  }
  flex: 1;
  display: flex;
  align-items: center;
  vertical-align: middle;
  padding: 20px;
  .navigation{
    @media (max-width: 700px) {  
     flex: 8;
    }
    flex: 8;
    .link{
        /* this is a mobile friendly media query  */
  /* if the screen is less the 700px wide it will inherit this style */
   @media (max-width: 700px) {  
     font-size: .8rem;
  }
      font-size: 1.4rem;
      margin-right: 20px;
    }
  }
  .user-icon{
    display: flex;
        align-items: center;
    vertical-align: middle;
    flex: 2;
        margin-right: 20px;
  }
  .login{
     @media (max-width: 700px) {  
     font-size: .6rem;
  }
    font-size: 1rem;
    text-align: center;
  }
  input{
    flex: 1;
    @media (max-width: 700px) {  
    height: 20px;
    flex: 1;
    font-size: 1rem;
  }
    border-radius: 18px;
    padding: 8px;
    border: none;
    height: 30px;
    font-size: 1.2rem;
    &:focus {
    outline: none;
}
  }
  .user-profile-photo{
    @media (max-width: 700px) {  
    height: 30px;
    width: 30px;  
    }
    align-items: center;
    vertical-align: middle;
    height: 50px;
    width: 50px;   
    display: flex;
    color: white;
    span{
      @media (max-width: 700px) {  
     font-size: .8rem;
    }
      margin-left: 20px
    }
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
    console.log(user)
    return (
      <HeaderContainer>
        <SearchBar>
          <div className="navigation">
            <Link className="link" to="/Home">Home</Link>
            <Link className="link" to="/Top">Top</Link>
          </div>
          <div className="user-icon">
            {user && user.email ? (
              <div className="user-profile-photo">
                {user.profilePhoto ? (
                  <img src={user.profilePhoto} alt="" />
                ) : (<LoginIcon />)}
              </div>
            ) : (<Link className="login" to="/Login"><LoginIcon />Log In</Link>)
            }
          </div>

          <input type="text"
            placeholder='Search'
            onChange={(e) =>
              updateSearchTerm(e)
            }
            onKeyPress={e => {
              if (e.key === 'Enter') {
                this.props.history.push('/Search')
                this.props.logInSet();
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

export default withRouter(Header)