import './search-window.css';
import { Component } from 'react';
import { Alert, Spin, Input, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import debounce from 'lodash.debounce';

import SwapiService from '../../services/services';
import { stringLength } from '../../methods/methods';

import Card from './components/card';

const AlertMessage = {
  error: { message: 'Ошибка при запросе.', description: 'Проверьте сетевое подключение.' },
  info: { message: 'По вашему запросу ничего не найдено.', description: 'Попробуйте изменить ваш запрос.' },
};

class SearchWindow extends Component {
  SwapiService = new SwapiService();

  state = {
    movies: [],
    loading: false,
    messageBanner: false,
    typeBannerMessage: null,
    currentPage: 1,
    totalPages: null,
    movieSearch: 'bad boys',
  };

  debounceSearch = debounce((movie, currentPage) => {
    this.getMovie(movie, currentPage);
    this.setState({ loading: true });
  }, 1000);

  componentDidMount() {
    const { movieSearch, currentPage } = this.state;
    this.debounceSearch(movieSearch, currentPage);
  }

  componentDidUpdate(prevProps, prevState) {
    const { movieSearch, currentPage } = this.state;
    if (currentPage !== prevState.currentPage) {
      this.debounceSearch(movieSearch, currentPage);
    }
  }

  onSearch = (e) => {
    const { value } = e.target;
    if (!value.trim().length) {
      this.setState({ movieSearch: '', movies: [] });
      return;
    }
    this.setState({ currentPage: 1, movieSearch: value });
    this.debounceSearch(value, this.currentPage);
  };

  onError = () => {
    this.setState({
      loading: false,
      messageBanner: true,
      typeBannerMessage: 'error',
      movies: [],
    });
  };

  onChangePagination = (page) => {
    this.setState({ currentPage: page });
  };

  getMovie(movie) {
    const { currentPage } = this.state;
    this.SwapiService.getData(movie, currentPage)
      .then(({ movies, totalPages }) => {
        if (!movies.length) {
          this.setState({
            movies,
            loading: false,
            messageBanner: true,
            typeBannerMessage: 'info',
          });
          return;
        }
        this.setState({ movies, loading: false, totalPages, messageBanner: false });
      })
      .catch(this.onError);
  }

  render() {
    const { movies, loading, messageBanner, typeBannerMessage, currentPage, totalPages, movieSearch } = this.state;
    const spinner = loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} />} /> : null;
    const errorMessage = messageBanner ? <Alert type={typeBannerMessage} {...AlertMessage[typeBannerMessage]} /> : null;
    return (
      <div className="search-window">
        <div className="search-bar-wrap">
          <Input
            value={movieSearch}
            maxLength={40}
            onChange={this.onSearch}
            placeholder="Type to search..."
            allowClear
          />
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
                  <Card.Text>{stringLength(overview, 175)}</Card.Text>
                  <Card.RateItem count={10} />
                </Card.Content>
              </Card>
            );
          })}
        </div>
        <div className="search-window__pagination">
          <Pagination current={currentPage} onChange={this.onChangePagination} total={totalPages} />
        </div>
      </div>
    );
  }
}

export default SearchWindow;
