import React, { PureComponent } from 'react';
import TextList from '../molecules/TextList';
import Paginator from '../molecules/Paginator';
import { fetchItems, countItems } from '../Datasource';

const api = '/api/Authors';

export default class AuthorList extends PureComponent {
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
    const { searchText } = this.props;
    let where = {};
    if (typeof searchText !== 'undefined' && searchText !== '') {
      where.name = { regexp: '.*' + searchText + '.*' };
    }

    return countItems(api, where);
  }

  fetchItems(skip, itemPerPage) {
    const { searchText } = this.props;
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
      <TextList
        displayAttribute='name'
        items={items}
        onItemClick={this.props.onItemClick}
      />
    );
  }
}
