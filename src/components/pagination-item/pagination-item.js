import { Component } from 'react';
import './pagination-item.css';
import { Pagination } from 'antd';
// eslint-disable-next-line react/prefer-stateless-function
class PaginationItem extends Component {
  render() {
    return <Pagination total={50} />;
  }
}

export default PaginationItem;
