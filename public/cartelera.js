import Images from './images.js';
import MovieDetails from './moviedetails.js';

class Cartelera {
  constructor() {
    this.loadCartelera = this.loadCartelera.bind(this);
    this._onCarteleraJsonReady = this._onCarteleraJsonReady.bind(this);
    this.doLogout = this.doLogout.bind(this);

    document.addEventListener('DOMContentLoaded', () => {
    
      this.loadCartelera();

      const logout = document.querySelector('#logoutBtn');
      if (logout) {
        logout.addEventListener('click', this.doLogout);
      }
    });
  }

  _renderCartelera() {
    const imageContainer = document.querySelector('#cartelera-container');
    imageContainer.innerHTML = "";  

    for (const movie of this.moviesList) {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie-container');

      new Images(movieElement, movie.image);
      new MovieDetails(movieElement, movie.title, movie.description, movie.rating, movie.duration);

      imageContainer.appendChild(movieElement);  
    }
  }

  loadCartelera() {
    fetch('/loadCartelera')
      .then(response => {
        if (!response.ok) {
          throw new Error('Datos');
        }
        return response.json();
      })
      .then(this._onCarteleraJsonReady)
      .catch(err => console.error('Error loading movies:', err));
  }

  _onCarteleraJsonReady(json) {
    console.log("JSON IS READY", json);
    this.moviesList = json.movies;
    this._renderCartelera(); 
    this.loadCarteleraImages(json.movies);  
  }

  loadCarteleraImages(moviesList) {
    const imageContainer = document.querySelector('#cartelera-container');
    imageContainer.innerHTML = "";  

    for (const movie of moviesList) {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie-container');
      new Images(movieElement, movie.image);
      new MovieDetails(movieElement, movie.title, movie.description, movie.rating, movie.duration);
      imageContainer.appendChild(movieElement);  
    }
  }

  doLogout() {
  }
}

new Cartelera();
