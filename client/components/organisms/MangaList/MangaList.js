import equal from 'deep-equal';
import React, { PureComponent } from 'react';

import MangaCard from '@molecule/MangaCard';
import { ContentGrid } from '@organism/ContentGrid';
import { WithLoadMore } from '@organism/WithLoadMore';
import { loadMoreMangas } from './actions';


// component
class MangaList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: 'manga-list-' + props.uid,
      filter: {
        title: props.searchText,
        authorId: props.authorId
      }
    };
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
