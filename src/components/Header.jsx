import React, { Component } from 'react';
import styled from 'styled-components';

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
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 20px;
  .navigation{
    .link{
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
    const { user } = this.props
    return (
      <HeaderContainer>
        <SearchBar>
          <div className="navigation">
            <a className="link" href="/Home">Home</a>
            <a className="link" href="/Top">Top Movies</a>
          </div>
          <div className="eval-logo">EVAL</div>
          <div className="user-icon">
            {user.profilePhoto ? (
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
            onChange={(e) => {
              this.setState({ searchTerm: e.target.value })
            }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                this.props.getMovies(this.state.searchTerm)
              }
            }}
          />
        </SearchBar>
      </HeaderContainer>
    )
  }
}

export default Header