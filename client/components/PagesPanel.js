import React, { PureComponent } from 'react';
import { fetchItems, countItems } from './Datasource';
import PageList from './PageList';
import hasPagination from './hasPagination';

const api = '/api/Pages';
const ListHasPagination = hasPagination(PageList, 20);

export default class PagesPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.countItems = this.countItems.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
    this.shouldResetPagination = this.shouldResetPagination.bind(this);
  }

  countItems() {
    const manga = this.props.manga;
    if (manga === null) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }

    const where = {mangaId: manga.id};
    return countItems(api, where);
  }

  fetchItems(skip, itemPerPage) {
    const manga = this.props.manga;
    if (manga === null) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }

    const where = {mangaId: manga.id};
    return fetchItems(api, where, skip, itemPerPage);
  }

  shouldResetPagination(prevProps) {
    if (typeof prevProps === 'undefined') {
      return false;
    }

    return this.props.manga !== prevProps.manga;
  }

  render() {
    const manga = this.props.manga;

    return (
      <div>
        <h2>{this.constructor.name}</h2>

        {manga ? (<h3>{manga.title}</h3>) : ''}

        <ListHasPagination
          manga={manga}
          onItemClick={this.props.onItemClick}
          fetchItems={this.fetchItems}
          countItems={this.countItems}
          shouldResetPagination={this.shouldResetPagination}
        />
      </div>
    );
  }
}
