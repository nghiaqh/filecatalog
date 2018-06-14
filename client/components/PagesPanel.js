import React, { Component } from 'react';
import { fetchItems, countItems } from './Datasource';
import PageList from './PageList';
import hasPagination from './hasPagination';

const api = '/api/Pages';
const ListHasPagination = hasPagination(PageList);

export default class PagesPanel extends Component {
  constructor(props) {
    super(props);
    this.countItems = this.countItems.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
    this.stateNeedsReset = this.stateNeedsReset.bind(this);
  }

  countItems() {
    const manga = this.props.manga;
    if (manga === null) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
    const property = manga ? 'mangaId' : null;
    const value = manga ? manga.id : null;
    return countItems(api, property, value);
  }

  fetchItems(skip, itemPerPage) {
    const manga = this.props.manga;
    if (manga === null) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
    const where = manga ? {mangaId: manga.id} : {};
    return fetchItems(api, where, skip, itemPerPage);
  }

  stateNeedsReset(prevProps, prevState, snapshot) {
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
          stateNeedsReset={this.stateNeedsReset}
        />
      </div>
    );
  }
}
