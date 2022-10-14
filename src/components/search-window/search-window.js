import './search-window.css';
import { Component } from 'react';
// import { Spin } from 'antd';

import SearchBar from '../search-bar';
import PaginationItem from '../pagination-item';
import SwapiService from '../../services/services';

import CardView from './components/card-view';

class SearchWindow extends Component {
  SwapiService = new SwapiService();

  state = {
    movies: [],
  };

  componentDidMount() {
    this.getMovie();
  }

  getMovie() {
    this.SwapiService.getMovie('The way back').then((date) => {
      this.setState({ movies: date.results.slice(0, 2) });
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
          {/* <Spin /> */}
          <CardView movies={movies} />
        </div>
        <div className="search-window__pagination">
          <PaginationItem />
        </div>
      </div>
    );
  }
}

export default SearchWindow;
