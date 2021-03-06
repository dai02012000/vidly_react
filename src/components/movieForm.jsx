import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
// import { getGenres } from '../services/fakeGenreService';
// import { getMovie, saveMovie } from './../services/fakeMovieService';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(3).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).required().label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate")
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace('/not-found');
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    }
  }

  doSubmit = async () => {
    // call api
    await saveMovie(this.state.data);


    this.props.history.replace('/movies');
    console.log(this.props.history);
  }

  render() {
    return (
      <div>
        <h1>Movie Form </h1>
        <form onSubmit={this.handleSubmit} >
          {this.renderInput("title", "Title")}
          {this.renderInputSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>

      </div>
    );
  }
}

export default MovieForm;

