import React, { Component } from 'react';
import PageList from './PageList';
import Pagination from './Pagination';
import { fetchItems, countItems } from './Datasource';

const ITEM_PER_PAGE = 12;
const api = '/api/Pages';

export default class PagesPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      total: 0,
      current: 0
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  handlePageClick(page) {
    this.props.onPageSelect(page);
  }

  handlePagination(index) {
    this.setState({current: index});
    const manga = this.props.manga;
    const skip = (index - 1) * ITEM_PER_PAGE;
    fetchItems(api, {mangaId: manga.id}, skip, ITEM_PER_PAGE)
      .then(pages => this.setState({ pages: pages }));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const manga = this.props.manga;
    if (manga && (manga !== prevProps.manga)) {
      countItems(api, 'mangaId', manga.id)
        .then(result => {
          if (result.count > 0) {
            this.setState({
              total: Math.ceil(result.count / ITEM_PER_PAGE),
              current: 1
            });
          }
        });
      const skip = (this.state.current - 1) * ITEM_PER_PAGE;
      fetchItems(api, {mangaId: manga.id}, skip, ITEM_PER_PAGE)
        .then(pages => this.setState({ pages: pages }));
    }
  }

  render() {
    const manga = this.props.manga;

    return (
      <div>
        <h2>{this.constructor.name}</h2>

        {manga ? (<h3>{manga.title}</h3>) : ''}

        <PageList
          pages={this.state.pages}
          onPageClick={this.handlePageClick}
        />

        <Pagination
          total={this.state.total}
          current={this.state.current}
          handlePagination={this.handlePagination}
        />
      </div>
    );
  }
}
