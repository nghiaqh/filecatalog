import React, { PureComponent } from 'react';
import { fetchItems, countItems } from '../Datasource';
import AuthorList from '../molecules/AuthorList';
import PaginatedList from '../molecules/PaginatedList';

const api = '/api/Authors';

export default class AuthorsPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.countItems = this.countItems.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
    this.shouldResetPagination = this.shouldResetPagination.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  countItems() {
    const { filterText } = this.props;
    let where = {};
    if (typeof filterText !== 'undefined' && filterText !== '') {
      where.name = {
        regexp: '.*' + filterText + '.*',
        options: 'i'
      }
    }

    return countItems(api, where);
  }

  fetchItems(skip, itemPerPage) {
    const { filterText } = this.props;
    let where = {};
    if (typeof filterText !== 'undefined' && filterText !== '') {
      where.name = {
        regexp: '.*' + filterText + '.*',
        options: 'i'
      }
    }

    return fetchItems(api, where, skip, itemPerPage);
  }

  shouldResetPagination(prevProps) {
    try {
      return this.props.filterText !== prevProps.filterText;
    } catch(e) {
      return false;
    }
  }

  renderList(items) {
    return (
      <AuthorList
        items={items}
        onItemClick={this.props.onItemClick}
      />
    );
  }

  render() {
    return (
      <div>
        <PaginatedList
          filterText={this.props.filterText}
          fetchItems={this.fetchItems}
          countItems={this.countItems}
          shouldResetPagination={this.shouldResetPagination}
          render={this.renderList}
        />
      </div>
    );
  }
}
