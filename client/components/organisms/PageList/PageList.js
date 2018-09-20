import equal from 'deep-equal';
import React, { PureComponent } from 'react';

import PageCard from '@molecule/PageCard';
import { ContentGrid } from '@organism/ContentGrid';
import { WithLoadMore } from '@organism/WithLoadMore';
import { loadMorePages } from './actions';

// component
export default class PageList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: 'page-list-' + props.uid,
      filter: {
        mangaId: props.manga.id
      }
    };

    this.renderCard = this.renderCard.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
    this.switchToPageView = this.switchToPageView.bind(this);
  }

  render() {
    return (
      <WithLoadMore
        entityType='pages'
        render={this.renderGrid}
        loadMore={loadMorePages}
        id={this.state.id}
        filter={this.state.filter}
        pageSize={24}
      />
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { uid, manga } = this.props;
    const id = `page-list-${uid}`;
    const filter = {
      mangaId: manga.id
    };

    if (!equal(filter, prevState.filter) || id !== prevState.id) {
      this.setState({ id, filter })
    }
  }

  renderCard(item) {
    return (
      <PageCard
        key={item.id}
        page={item}
        manga={this.props.manga}
        onItemClick={this.switchToPageView}
      />
    );
  }

  renderGrid(items, retrievingItems) {
    return (
      <ContentGrid
        items={items}
        render={this.renderCard}
        retrievingItems={retrievingItems}
      />
    );
  }

  switchToPageView(page) {
    const target = `/mangas/${page.mangaId}/${page.number}`;
    this.props.history.push(target);
  }
}
