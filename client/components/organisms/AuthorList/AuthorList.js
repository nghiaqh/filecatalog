import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import AuthorListItem from '../../molecules/AuthorListItem';
import { ContentList } from '../ContentList';
import { WithLoadMore } from '../WithLoadMore';
import { loadMoreAuthors } from './actions';

// component
class AuthorList extends PureComponent {
  constructor(props) {
    super(props);

    this.renderListItem = this.renderListItem.bind(this);
    this.renderList = this.renderList.bind(this);
    this.id = 'author-list-' + props.uid;
  }

  render() {
    const { searchText, order } = this.props;
    const filter = { name: searchText };

    return (
      <WithLoadMore
        entityType='authors'
        render={this.renderList}
        loadMore={loadMoreAuthors}
        id={this.id}
        filter={filter}
        pageSize={24}
        order={order}
      />
    );
  }

  renderListItem(item) {
    return (
      <AuthorListItem
        key={'author-' + item.id}
        author={item}
        location={this.props.location}
      />
    );
  }

  renderList(items, retrievingItems) {
    return (
      <StyledAuthorList
        twoLine
        items={items}
        render={this.renderListItem}
        retrievingItems={retrievingItems}
      />
    )
  }
}

const StyledAuthorList = styled(ContentList)`
  position: relative;
`;

export default AuthorList;
