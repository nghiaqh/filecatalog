import React, { PureComponent } from 'react';
import TextList from '../molecules/TextList';
import Paginator from '../molecules/Paginator';
import { fetchItems, countItems } from '../Datasource';

const api = '/api/Mangas';

export default class MangaList extends PureComponent {
  constructor(props) {
    super(props);
    this.countItems = this.countItems.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
    this.renderList = this.renderList.bind(this);
  }
  render() {
    return (
      <Paginator
        fetchItems={this.fetchItems}
        countItems={this.countItems}
        render={this.renderList}
        {...this.props}
      />
    );
  }

  countItems() {
    const { author, searchText } = this.props;
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
    const { author, searchText } = this.props;
    const where = author ? {authorId: author.id} : {};
    if (typeof searchText !== 'undefined' && searchText !== '') {
      where.title = {
        regexp: '.*' + searchText + '.*',
        options: 'i'
      }
    }
    const filter = {
      where: where,
      order: 'created DESC',
      include: 'author'
    }

    return fetchItems(api, filter, skip, itemPerPage);
  }

  renderList(items) {
    return (
      <TextList
        displayTextFrom='title'
        displaySecondaryFrom={['author', 'name']}
        items={items}
        onItemClick={this.props.onItemClick}
      />
    );
  }
}
