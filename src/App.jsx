import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeText } from './redux/actions'
import Main from './components/Main'

class App extends Component {

  render() {
    const { highestRated } = this.props
    return (
      <Main highestRated={highestRated} />
    );
  }
}

const mapStateToProps = state => ({
  text: state.text,
  highestRated: state.highestRated
})

const mapDispatchToProps = {
  changeText,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
