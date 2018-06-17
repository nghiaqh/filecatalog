import React, { PureComponent } from 'react';
import { fetchItems, countItems } from './Datasource';
import MangaList from './MangaList';
import hasSearchBox from './hasSearchBox';
import hasPagination from './hasPagination';

const api = '/api/Mangas';
const ListHasSearchAndPagination = hasPagination(hasSearchBox(MangaList));

export default class MangasPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.countItems = this.countItems.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
    this.stateNeedsReset = this.stateNeedsReset.bind(this);
  }

  countItems() {
    const author = this.props.author;
    const property = author ? 'authorId' : null;
    const value = author ? author.id : null;
    return countItems(api, property, value);
  }

  fetchItems(skip, itemPerPage) {
    const author = this.props.author;
    const where = author ? {authorId: author.id} : {};
    return fetchItems(api, where, skip, itemPerPage);
  }

  stateNeedsReset(prevProps, prevState, snapshot) {
    return this.props.author !== prevProps.author;
  }

  render() {
    const author = this.props.author;

    return (
      <div>
        <h2>{this.constructor.name}</h2>

        {author ? (<h3>Mangas by {author.name}</h3>) : ''}

        <ListHasSearchAndPagination
          author={author}
          onItemClick={this.props.onItemClick}
          fetchItems={this.fetchItems}
          countItems={this.countItems}
          stateNeedsReset={this.stateNeedsReset}
        />
      </div>
    );
  }
}
