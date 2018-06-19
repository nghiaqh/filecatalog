import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { fetchItems, countItems } from '../Datasource';
import PageList from './PageList';
import PaginatedList from '../molecules/PaginatedList';

const api = '/api/Pages';

export default class PagesPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.countItems = this.countItems.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
    this.renderList = this.renderList.bind(this);
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

  renderList(items, loadPrevList, loadNextList) {
    return (
      <PageList
        items={items}
        loadPrevList={loadPrevList}
        loadNextList={loadNextList}
        onItemClick={this.props.onItemClick}
      />
    );
  }

  render() {
    const manga = this.props.manga;

    return (
      <section>
        {manga ? (<h3>{manga.title}</h3>) : ''}

        <PaginatedList
          manga={this.props.manga}
          fetchItems={this.fetchItems}
          countItems={this.countItems}
          itemsPerPage={this.props.itemsPerPage}
          render={this.renderList}
        />
      </section>
    );
  }
}
