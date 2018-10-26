import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeText } from './redux/actions'
import Main from './components/Main'

class App extends Component {

  render() {
    return (
      <Main />
    );
  }
}

const mapStateToProps = state => ({
  text: state.text
})

const mapDispatchToProps = {
  changeText,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
