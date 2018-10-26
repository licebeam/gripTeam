import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeText } from './redux/actions'

class App extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="App">
        {this.props.text}
        <button onClick={() => this.props.changeText('yo')} />
      </div>
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
