import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { fetchItems, countItems } from '../Datasource';
import AuthorList from './AuthorList';
import PaginatedList from '../molecules/PaginatedList';
import SearchBox from '../molecules/SearchBox';

const AuthorsPaginatedList = styled(PaginatedList)`
  ul {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  li {
    flex-basis: 30%;
  }
`

const api = '/api/Authors';

export default class AuthorsPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.countItems = this.countItems.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  handleSearch(searchText) {
    this.setState({searchText: searchText});
  }

  countItems() {
    const { searchText } = this.state;
    let where = {};
    if (typeof searchText !== 'undefined' && searchText !== '') {
      where.name = { regexp: '.*' + searchText + '.*' };
    }

    return countItems(api, where);
  }

  fetchItems(skip, itemPerPage) {
    const { searchText } = this.state;
    let where = {};
    if (typeof searchText !== 'undefined' && searchText !== '') {
      where.name = { regexp: '.*' + searchText + '.*' };
    }

    return fetchItems(api, where, skip, itemPerPage);
  }

  renderList(items) {
    return (
      <AuthorList
        items={items}
        onItemClick={this.props.onItemClick}
      />
    );
  }

  render() {
    return (
      <section>
        <h3>Authors</h3>
        <SearchBox onSearch={this.handleSearch} />
        <AuthorsPaginatedList
          searchText={this.state.searchText}
          fetchItems={this.fetchItems}
          countItems={this.countItems}
          itemsPerPage={this.props.itemsPerPage}
          render={this.renderList}
        />
      </section>
    );
  }
}
