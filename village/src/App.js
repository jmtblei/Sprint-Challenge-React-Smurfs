import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import { Route, NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  
  componentDidMount(){
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => {
        console.log(response);
        this.setState({
          smurfs: response.data
        })
      })
      .catch(err => console.log(err));
  }

  updateSmurfList = smurfData => {
    this.setState({
      smurfs: smurfData
    });
  }

  deleteSmurf= id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(response => {
        console.log(response);
        this.setState({
          smurfs: response.data
        });
      })
      .catch(err => console.log(err));
  };

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
      <header>
        <NavLink to="/smurf-form">Add Smurfs</NavLink>
        <NavLink to="/">Smurfs</NavLink>
      </header>
       <Route 
          exact 
          path="/"
          render={props => {
          return (
          <div>
            <Smurfs {...props} smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf}/>
          </div>
          );
          }} />
        <Route 
        path="/smurf-form"
        render={props => {
          return (
            <div>
            <SmurfForm {...props} smurfs={this.state.smurfs} updateSmurfList={this.updateSmurfList}/>
            </div>
          );
        }}
        />
      </div>
    );
  }
}

export default App;
