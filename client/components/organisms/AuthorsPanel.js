import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { fetchItems, countItems } from '../Datasource';
import AuthorList from './AuthorList';
import Paginator from '../molecules/Paginator';
import SearchBox from '../molecules/SearchBox';

const AuthorsPaginator = styled(Paginator)`
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
    const filter = { order: 'name ASC' };
    if (typeof searchText !== 'undefined' && searchText !== '') {
      filter.where = {
        name: { regexp: '.*' + searchText + '.*' }
      };
    }

    return fetchItems(api, filter, skip, itemPerPage);
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
        <AuthorsPaginator
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
