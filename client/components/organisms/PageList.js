import React, { PureComponent } from 'react';
import TextList from '../molecules/TextList';
import Paginator from '../molecules/Paginator';
import { fetchItems, countItems } from '../Datasource';

const api = '/api/Pages';

export default class PageList extends PureComponent {
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

    const where = { mangaId: manga.id };
    return countItems(api, where);
  }

  fetchItems(skip, itemPerPage) {
    const manga = this.props.manga;
    if (manga === null) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }

    const filter = {
      where: { mangaId: manga.id },
      order: 'title'
    };
    return fetchItems(api, filter, skip, itemPerPage);
  }

  renderList(items) {
    return (
      <TextList
        items={items}
        displayAttribute='title'
        onItemClick={this.props.onItemClick}
      />
    );
  }

  render() {
    return (
      <Paginator
        fetchItems={this.fetchItems}
        countItems={this.countItems}
        itemsPerPage={this.props.itemsPerPage}
        manga={this.props.manga}
        render={this.renderList}
      />
    );
  }
}
