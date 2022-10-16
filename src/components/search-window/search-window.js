import './search-window.css';
import { Component } from 'react';
import { Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

import SearchBar from '../search-bar';
import PaginationItem from '../pagination-item';
import SwapiService from '../../services/services';
import { stringLength } from '../../methods/methods';

import Card from './components/card';

class SearchWindow extends Component {
  SwapiService = new SwapiService();

  state = {
    movies: [],
    loading: true,
    onError: false,
    textMessageError: null,
    typeBannerMessage: null,
  };

  componentDidMount() {
    this.getMovie();
  }

  onError = () => {
    this.setState({
      loading: false,
      onError: true,
      textMessageError: ['Ошибка при запросе.', 'Проверьте сетевое подключение.'],
      typeBannerMessage: 'error',
    });
  };

  getMovie() {
    this.SwapiService.getMovies('The way back')
      .then((movies) => {
        if (movies.length) this.setState({ movies, loading: false });
        if (!movies.length)
          this.setState({
            movies,
            loading: false,
            onError: true,
            textMessageError: ['По вашему запросу ничего не найдено.', 'Попробуйте изменить ваш запрос.'],
            typeBannerMessage: 'info',
          });
      })
      .catch(this.onError);
  }

  render() {
    const { movies, loading, onError, textMessageError, typeBannerMessage } = this.state;
    const spinner = loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} />} /> : null;
    const errorMessage = onError ? (
      <Alert type={typeBannerMessage} message={textMessageError[0]} description={textMessageError[1]} />
    ) : null;
    return (
      <div className="search-window">
        <div className="search-bar-wrap">
          <SearchBar />
        </div>
        <div className="search-window__card">
          {spinner}
          {errorMessage}
          {movies.map((movie) => {
            const { id, title, overview, voteAverage, posterPath, releaseDate } = movie;
            const imageURl = this.SwapiService.getImageUrl(posterPath);
            return (
              <Card key={id}>
                <Card.Image imageURl={imageURl} alt="movie picture" />
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
                  <Card.Text>{stringLength(overview, 200)}</Card.Text>
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
