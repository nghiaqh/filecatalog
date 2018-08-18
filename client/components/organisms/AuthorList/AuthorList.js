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
    this.handleClick = this.handleClick.bind(this);
    this.id = 'author-list-' + props.uid;
  }

  render() {
    const { searchText } = this.props;
    const filter = { name: searchText };

    return (
      <WithLoadMore
        entityType='authors'
        render={this.renderList}
        loadMore={loadMoreAuthors}
        id={this.id}
        filter={filter}
      />
    );
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

  handleClick(author) {
    const target = `/authors/${author.id}`;
    this.props.history.push(target);
  }
}

const StyledAuthorList = styled(ContentList)`
  position: relative;
`;

export default AuthorList;
