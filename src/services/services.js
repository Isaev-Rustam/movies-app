import icon from '../components/search-window/components/card/default.jpg';

export default class SwapiService {
  static _transformMovies(movie) {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      voteAverage: movie.vote_average,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
    };
  }

  _apiBase = 'https://api.themoviedb.org/3';

  _apiKey = 'f34c6c5a87a1b720c85d841be1351410';

  _imageBase = 'http://image.tmdb.org/t/p/';

  _imageSize = ['w300', 'w780', 'w1280', 'original'];

  _defaultImage = icon;

  async getResourceMovies(movie) {
    const url = `${this._apiBase}/search/movie?api_key=${this._apiKey}&language=en-US&query=${movie}&page=1&include_adult=false`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received ${res.status}`);
    }
    return res.json();
  }

  async getMovies(movie) {
    const res = await this.getResourceMovies(movie);
    return res.results.map(SwapiService._transformMovies);
  }

  getImageUrl(imgUrl) {
    return imgUrl ? `${this._imageBase}${this._imageSize[0]}${imgUrl}` : this._defaultImage;
  }
}
