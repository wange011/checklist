import React, { Component } from 'react';
import ListContainer from './components/ListContainer'
import './App.css';
import { connect } from 'react-redux';

class App extends Component {

  handleAddList = () => {
    this.props.addList();
  }

  render() {
    return (
      <div className="App">
        <ListContainer />
        <button onClick={this.handleAddList} className="w3-button w3-circle">+</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addList: () => {
      dispatch({type: 'ADD_LIST'})
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
