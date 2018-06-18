import React, { PureComponent } from 'react';
import { fetchItems, countItems } from '../Datasource';
import MangaList from '../molecules/MangaList';
import PaginatedList from '../molecules/PaginatedList';

const api = '/api/Mangas';

export default class MangasPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.countItems = this.countItems.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
    this.shouldResetPagination = this.shouldResetPagination.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  countItems() {
    const { author, filterText } = this.props;
    const where = author ? {authorId: author.id} : {};
    if (typeof filterText !== 'undefined' && filterText !== '') {
      where.title = {
        regexp: '.*' + filterText + '.*',
        options: 'i'
      }
    }

    return countItems(api, where);
  }

  fetchItems(skip, itemPerPage) {
    const { author, filterText } = this.props;
    const where = author ? {authorId: author.id} : {};
    if (typeof filterText !== 'undefined' && filterText !== '') {
      where.title = {
        regexp: '.*' + filterText + '.*',
        options: 'i'
      }
    }

    return fetchItems(api, where, skip, itemPerPage);
  }

  shouldResetPagination(prevProps) {
    try {
      return (this.props.author !== prevProps.author) ||
        (this.props.filterText !== prevProps.filterText);
    } catch(e) {
      return false;
    }
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
      <div>
        {author ? (<h3>Mangas by {author.name}</h3>) : (<h3>Mangas</h3>)}

        <PaginatedList
          author={this.props.author}
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
