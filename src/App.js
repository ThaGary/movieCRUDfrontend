import React, { Component } from 'react';
import './App.css';
import Movies from './movies.js';
class App extends Component {
  constructor() {
    super()
    this.state = { 
      movies : null,
      info: null 
    }
  }
  async componentDidMount() {
    fetch('https://garysmovies.herokuapp.com/')
    .then(response => response.json())
    .then(movies => this.setState({ movies }))
  }
  handleClick = (event) => {
    fetch('https://garysmovies.herokuapp.com/'+event.target.id)
    .then(response => response.json())
    .then(info => this.setState({ info }))
    console.log(event.target.id)
  }
    render() {
      console.log(this.state.info)
        return ( 
          <div className="movies" >
            {this.state.info && 
            <div className="media">
            <img className="mr-3" src={this.state.info.poster} alt="" width='100px' />
            <div className="media-body">
              <h5 className="mt-0">{this.state.info.title}</h5>
              <h5>Director: {this.state.info.director}</h5>
              <h5>Year: {this.state.info.year}</h5>
              <h5>Score: {this.state.info.rating}</h5>
            </div>
          </div>}
            {this.state.movies ? <Movies handleClick={this.handleClick} movies={this.state.movies}/> : <div>Loading</div>}
          </div>

        );
    }
  }

export default App;