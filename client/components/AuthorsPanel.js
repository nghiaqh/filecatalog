import React, { Component } from 'react';
import AuthorList from './AuthorList';
import SearchBox from './SearchBox';
import Pagination from './Pagination';
import { fetchItems, countItems } from './Datasource';

const ITEM_PER_PAGE = 12;
const api = '/api/Authors';

export default class AuthorsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      authors: [],
      total: 0,
      current: 0
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleAuthorClick = this.handleAuthorClick.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({filterText: filterText});
  }

  handleAuthorClick(author) {
    this.props.onAuthorSelect(author);
  }

  handlePagination(index) {
    this.setState({current: index});
    const skip = (index - 1) * ITEM_PER_PAGE;
    fetchItems(api, {}, skip, ITEM_PER_PAGE)
      .then(authors => this.setState({ authors: authors }));
  }

  componentDidMount() {
    const skip = (this.state.current - 1) * ITEM_PER_PAGE;
    fetchItems(api, {}, skip, ITEM_PER_PAGE)
      .then(authors => this.setState({ authors: authors }));
  }

  render() {
    return (
      <div>
        <h2>{this.constructor.name}</h2>
        <SearchBox
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <AuthorList
          authors={this.state.authors}
          filterText={this.state.filterText}
          onAuthorClick={this.handleAuthorClick}
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
