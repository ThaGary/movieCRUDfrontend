import React, { Component } from "react";
import "./App.css";
import Movies from "./movies.js";
import Form from "./Form.js";
class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      info: null,
      title: "",
      director: "",
      year: "",
      rating: "",
      poster: ""
    };
  }
  componentDidMount() {
    fetch("https://garysmovies.herokuapp.com/")
      .then(response => response.json())
      .then(movies =>
        this.setState({
          movies
        })
      );
  }
  handleClick = event => {
    fetch("https://garysmovies.herokuapp.com/" + event.target.id)
      .then(response => response.json())
      .then(info =>
        this.setState({
          info
        })
      );
  };

  onSubmitMovie = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let newMovie = {
      title: formData.get("Title"),
      director: formData.get("Director"),
      year: formData.get("Release_Year"),
      rating: formData.get("Rating"),
      poster: formData.get("poster")
    };
    return fetch("https://garysmovies.herokuapp.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMovie)
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          movies: [...this.state.movies, response[0]]
        });
      });
  };
  deleteMovie = event => {
    var deleteID = this.state.info.id
    fetch("https://garysmovies.herokuapp.com/" + deleteID, {
      method: "DELETE"
    });
    let movies = this.state.movies.filter(movie => {
      return movie.id !== this.state.info.id;
    });
    this.setState({
      movies: movies
    });
  };

  editMovie = event => {
    var editID = this.state.info.id;
    event.preventDefault();
    const formData = new FormData(event.target);
    let editedMovie = {
      title: formData.get("Title"),
      director: formData.get("Director"),
      year: formData.get("Release_Year"),
      rating: formData.get("Rating"),
      poster: formData.get("poster")
    };
    return fetch("https://garysmovies.herokuapp.com/" + editID, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(editedMovie)
    })
      .then(response => response.json())
      .then(response => {
        let movies = this.state.movies.filter(movie => {
          return movie.id !== response[0].id;
        });
        this.setState({
          movies: movies
        });
      });
  };
  render() {
    return (
      <div className="movies">
      <h1>Gary's Movie List</h1>
        {this.state.info && (
          <div className="media">
            <img
              className="mr-3"
              src={this.state.info.poster}
              alt=""
              width="100px"
            />
            <div className="media-body">
              <h5 className="mt-0">{this.state.info.title}</h5>
              <h5>Director: {this.state.info.director}</h5>
              <h5>Year: {this.state.info.year}</h5>
              <h5>Score: {this.state.info.rating}</h5>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.deleteMovie}
              >
                DELETE
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                EDIT
              </button>
              <div
                className="modal fade"
                id="exampleModal"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Edit Movie
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"    
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={this.editMovie}>
                        <input
                          type="text"
                          name="Title"
                          placeholder={this.state.info.title}
                        />
                        <input
                          type="text"
                          name="Director"
                          placeholder={this.state.info.director}
                        />
                        <input
                          type="text"
                          name="Release_Year"
                          placeholder={this.state.info.year}
                        />
                        <input
                          type="text"
                          name="Rating"
                          placeholder={this.state.info.rating}
                        />
                        <input
                          type="url"
                          name="poster"
                          placeholder={this.state.info.poster}
                        />
                        <input value="Submit" type="submit" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.movies ? (
          <Movies editMovie={this.editMovie} handleClick={this.handleClick} movies={this.state.movies} />
        ) : (
          <div>Loading</div>
        )}
        <Form onSubmitMovie={this.onSubmitMovie} />
      </div>
    );
  }
}

export default App;
