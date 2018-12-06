import React, { Component } from 'react';
import './App.css';
import Movies from './movies.js';

class App extends Component {
  constructor() {
    super()
    this.state = { 
      movies : null 
    }
  }
  async componentDidMount() {
    fetch('https://garysmovies.herokuapp.com/')
    .then(response => response.json())
    .then(movies => this.setState({ movies }))
  }
    render() {
        return ( 
          <div className="movies" >
            {this.state.movies ? <Movies movies={this.state.movies}/> : <div>Loading</div>}
          </div>
        );
    }
  }

export default App;