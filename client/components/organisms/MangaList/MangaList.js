import React, { PureComponent } from 'react';

import MangaCard from '@molecule/MangaCard';
import MangaListItem from '@molecule/MangaListItem';
import { ContentList } from '@organism/ContentList';
import { ContentGrid } from '@organism/ContentGrid';
import { WithLoadMore } from '@organism/WithLoadMore';
import { loadMoreMangas } from './actions';


// component
class MangaList extends PureComponent {
  constructor(props) {
    super(props);

    this.renderListItem = this.renderListItem.bind(this);
    this.renderList = this.renderList.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
  }

  render() {
    const { searchText, order, pageSize, display, uid, authorId } = this.props;
    const filter = { title: searchText, authorId };
    const id = 'manga-list-' + uid;
    const renderFunc = this.getRenderFunc(display);

    return (
      <WithLoadMore
        entityType='mangas'
        render={renderFunc}
        loadMore={loadMoreMangas}
        id={id}
        filter={filter}
        pageSize={pageSize || 48}
        order={order}
      />
    );
  }

  renderListItem(item) {
    return (
      <MangaListItem
        key={'manga-' + item.id}
        manga={item}
        location={this.props.location}
      />
    );
  }

  renderList(items, retrievingItems) {
    return (
      <ContentList
        twoLine
        avatarList={true}
        items={items}
        render={this.renderListItem}
        retrievingItems={retrievingItems}
      />
    )
  }

  renderCard(item) {
    return (
      <MangaCard
        key={item.id}
        manga={item}
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

export default MangaList;
