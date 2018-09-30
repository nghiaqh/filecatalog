import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import AuthorCard from '@molecule/AuthorCard';
import AuthorListItem from '@molecule/AuthorListItem';
import { ContentList } from '@organism/ContentList';
import { ContentGrid } from '@organism/ContentGrid';
import { WithLoadMore } from '@organism/WithLoadMore';
import { loadMoreAuthors } from './actions';

// component
class AuthorList extends PureComponent {
  constructor(props) {
    super(props);

    this.renderListItem = this.renderListItem.bind(this);
    this.renderList = this.renderList.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
  }

  render() {
    const { searchText, order, pageSize, display, uid } = this.props;
    const filter = { name: searchText };
    const id = 'author-list-' + uid;
    const renderFunc = this.getRenderFunc(display);

    return (
      <WithLoadMore
        entityType='authors'
        render={renderFunc}
        loadMore={loadMoreAuthors}
        id={id}
        filter={filter}
        pageSize={pageSize || 48}
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

  renderCard(item) {
    return (
      <AuthorCard
        key={item.id}
        author={item}
        history={this.props.history}
      />
    );
  }

  renderGrid(items, retrievingItems) {
    return (
      <ContentGrid
        items={items}
        render={this.renderCard}
        cols={this.props.cols}
        retrievingItems={retrievingItems}
      />
    )
  }

  getRenderFunc(type) {
    switch(type) {
      case 'list':
        return this.renderList;
      case 'grid':
        return this.renderGrid;
      default:
        return this.renderGrid;
    }
  }
}

const StyledAuthorList = styled(ContentList)`
  position: relative;
`;

export default AuthorList;
