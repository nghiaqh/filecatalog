import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import AuthorListItem from '../../molecules/AuthorListItem';
import ContentList from '../ContentList';
import { WithLoadMore } from '../WithLoadMore';
import { loadMoreAuthors } from './actions';

// component
export class AuthorList extends PureComponent {
  constructor(props) {
    super(props);

    this.renderListItem = this.renderListItem.bind(this);
    this.renderList = this.renderList.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.id = 'author-list-' + props.uid;
  }

  render() {
    const { withLoadMore, entities } = this.props;
    const data = withLoadMore[this.id] || {
      items: [],
      pageNumber: 1,
      pageSize: 20,
      total: 0
    };
    const { items, pageNumber, total, pageSize } = data;
    const authors = Array.isArray(items) ? items.map(i => entities.authors[i]) : [];
    const totalPages = Math.ceil(total / pageSize);
    return (
      <WithLoadMore
        items={authors}
        render={this.renderList}
        loadMore={this.loadMore}
        totalPages={totalPages || 1}
        pageNumber={pageNumber || 1}
      />
    );
  }

  componentDidMount() {
    const { dispatch, searchText } = this.props;
    const filter = { name: searchText };
    dispatch(loadMoreAuthors(this.id, 20, 1, filter));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, searchText, withLoadMore } = this.props;
    if (searchText !== prevProps.searchText) {
      const filter = { name: searchText };
      const { pageSize } = withLoadMore[this.id];
      dispatch(loadMoreAuthors(this.id, pageSize, 1, filter));
    }
  }

  renderListItem(item) {
    return (
      <AuthorListItem
        key={'author-' + item.id}
        key={item.id}
        author={item}
        onItemClick={this.handleClick}
      />
    );
  }

  renderList(items) {
    return (
      <StyledAuthorList
        items={items}
        render={this.renderListItem}
      />
    )
  }

  loadMore(number) {
    const { dispatch, withLoadMore } = this.props;
    const { pageNumber, total, pageSize, filter } = withLoadMore[this.id];
    const totalPages = Math.ceil(total / pageSize);
    if (number && number !== pageNumber && number <= totalPages) {
      dispatch(loadMoreAuthors(this.id, pageSize, number, filter));
    }
  }

  handleClick(author) {
    const target = `/authors/${author.id}`;
    this.props.history.push(target);
  }
}

const StyledAuthorList = styled(ContentList)`
  position: relative;
`;

// container
const mapStateToProps = (state) => {
  const { withLoadMore, entities } = state;

  return {
    withLoadMore,
    entities
  };
};

export default connect(mapStateToProps)(AuthorList);
