import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { fetchItems, countItems } from '../Datasource';
import MangaList from './MangaList';
import PaginatedList from '../molecules/PaginatedList';
import SearchBox from '../molecules/SearchBox';

const MangasPaginatedList = styled(PaginatedList)`
  ul {
    flex-direction: row;
    flex-wrap: wrap;
  }

  li {
    flex-basis: 50%;
  }
`

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
      <MangaList
        items={items}
        onItemClick={this.props.onItemClick}
      />
    );
  }

  render() {
    const author = this.props.author;

    return (
      <section>
        {author ?
          (
          <div>
            <h3>Mangas by {author.name}</h3>
            <button className="no-border" onClick={this.props.resetAuthor}>show all mangas</button>
          </div>
          ) :
          (<h3>Mangas</h3>)
        }

        <SearchBox onSearch={this.handleSearch} />

        <MangasPaginatedList
          author={this.props.author}
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
