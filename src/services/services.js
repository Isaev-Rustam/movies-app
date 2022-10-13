export default class SwapiService {
  _apiBase = 'https://api.themoviedb.org/3';

  _apiKey = 'f34c6c5a87a1b720c85d841be1351410';

  async getMovie(movie) {
    const url = `${this._apiBase}/search/movie?api_key=${this._apiKey}&language=en-US&query=${movie}&page=1&include_adult=false`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received ${res.status}`);
    }
    return res.json();
  }
}
