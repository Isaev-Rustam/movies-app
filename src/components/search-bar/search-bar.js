import './search-bar.css';
import { Input } from 'antd';
import { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class SearchBar extends Component {
  // state = { value: '' };
  //
  // handleChange = (event) => {
  //   this.setState({ value: event.target.value });
  // };
  //
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { value } = this.state;
  //   console.log(value);
  // };

  render() {
    // const { value } = this.state;
    return <Input placeholder="Type to search..." />;
  }
}

export default SearchBar;
