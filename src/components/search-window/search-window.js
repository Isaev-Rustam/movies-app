import './search-window.css';
import { Component } from 'react';
import { format } from 'date-fns';

import SearchBar from '../search-bar';
import PaginationItem from '../pagination-item';
import Card from '../card';
import SwapiService from '../../services/services';

class SearchWindow extends Component {
  static stringLength = (str) => {
    const limitLength = 200;
    let text = str.trim().slice(0, limitLength);
    const lastSpace = str.lastIndexOf(' ');
    if (lastSpace > 0) {
      text = text.substring(0, lastSpace);
    }
    return `${text}...`;
  };

  SwapiService = new SwapiService();

  state = {
    movies: [],
  };

  componentDidMount() {
    this.updatePlanet();
  }

  updatePlanet() {
    this.SwapiService.getMovie('The way back').then((date) => {
      this.setState({ movies: date.results });
    });
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="search-window">
        <div className="search-bar-wrap">
          <SearchBar />
        </div>
        <div className="search-window__card">
          {movies.map((movie) => {
            const {
              id,
              title,
              overview,
              vote_average: voteAverage,
              poster_path: posterPath,
              release_date: releaseDate,
            } = movie;
            return (
              <Card key={id}>
                <Card.Image img={posterPath} alt="movie picture" />
                <Card.Content>
                  <Card.Header>
                    <Card.Title>{title}</Card.Title>
                    <Card.Rating>{voteAverage}</Card.Rating>
                    <Card.ReleaseDate>
                      {releaseDate ? format(new Date(releaseDate), 'MMMM d yyyy') : 'Sorry'}
                    </Card.ReleaseDate>
                    <Card.Btns>
                      <button type="button" className="card__btn">
                        Action
                      </button>
                      <button type="button" className="card__btn">
                        Drama
                      </button>
                    </Card.Btns>
                  </Card.Header>
                  <Card.Text>{SearchWindow.stringLength(overview)}</Card.Text>
                  <Card.RateItem count={10} />
                </Card.Content>
              </Card>
            );
          })}
        </div>
        <div className="search-window__pagination">
          <PaginationItem />
        </div>
      </div>
    );
  }
}

export default SearchWindow;
