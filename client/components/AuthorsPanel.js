import React, { PureComponent } from 'react';
import { fetchItems, countItems } from './Datasource';
import AuthorList from './AuthorList';
import hasSearchBox from './hasSearchBox';
import hasPagination from './hasPagination';

const api = '/api/Authors';
const ListHasSearchAndPagination = hasPagination(hasSearchBox(AuthorList));

export default class AuthorsPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.countItems = this.countItems.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
  }

  countItems() {
    return countItems(api);
  }

  fetchItems(skip, itemPerPage) {
    return fetchItems(api, {}, skip, itemPerPage);
  }

  render() {
    return (
      <div>
        <h2>{this.constructor.name}</h2>

        <ListHasSearchAndPagination
          onItemClick={this.props.onItemClick}
          fetchItems={this.fetchItems}
          countItems={this.countItems}
        />
      </div>
    );
  }
}
