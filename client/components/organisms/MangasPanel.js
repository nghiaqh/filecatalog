import React, { PureComponent } from 'react';
import { fetchItems, countItems } from '../Datasource';
import MangaList from './MangaList';
import PaginatedList from '../molecules/PaginatedList';
import SearchBox from '../molecules/SearchBox';

const api = '/api/Mangas';

export default class MangasPanel extends PureComponent {
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
    const { author } = this.props;
    const { searchText } = this.state;
    const where = author ? {authorId: author.id} : {};
    if (typeof searchText !== 'undefined' && searchText !== '') {
      where.title = {
        regexp: '.*' + searchText + '.*',
        options: 'i'
      }
    }

    return countItems(api, where);
  }

  fetchItems(skip, itemPerPage) {
    const { author } = this.props;
    const { searchText } = this.state;
    const where = author ? {authorId: author.id} : {};
    if (typeof searchText !== 'undefined' && searchText !== '') {
      where.title = {
        regexp: '.*' + searchText + '.*',
        options: 'i'
      }
    }

    return fetchItems(api, where, skip, itemPerPage);
  }

  renderList(items) {
    return (
      <MangaList items={items} onItemClick={this.props.onItemClick} />
    );
  }

  render() {
    const author = this.props.author;

    return (
      <div>
        {author ? (<h3>Mangas by {author.name}</h3>) : (<h3>Mangas</h3>)}
        <SearchBox onSearch={this.handleSearch} />
        <PaginatedList
          author={this.props.author}
          searchText={this.state.searchText}
          fetchItems={this.fetchItems}
          countItems={this.countItems}
          render={this.renderList}
        />
      </div>
    );
  }
}
