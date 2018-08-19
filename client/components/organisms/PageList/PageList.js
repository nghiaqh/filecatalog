import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import PageCard from '../../molecules/PageCard';
import { ContentGrid } from '../ContentGrid';
import { WithLoadMore } from '../WithLoadMore';
import { loadMorePages } from './actions';

// component
export default class PageList extends PureComponent {
  constructor(props) {
    super(props);
    this.id = 'page-list-' + props.uid;

    this.renderCard = this.renderCard.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
    this.switchToPageView = this.switchToPageView.bind(this);
  }

  render() {
    const { manga } = this.props;
    const filter = {
      mangaId: manga.id
    };

    return (
      <WithLoadMore
        entityType='pages'
        render={this.renderGrid}
        loadMore={loadMorePages}
        id={this.id}
        filter={filter}
      />
    );
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

  renderGrid(items) {
    return (
      <ContentGrid
        items={items}
        render={this.renderCard}
      />
    );
  }

  switchToPageView(page) {
    const target = `/mangas/${page.mangaId}/${page.number}`;
    this.props.history.push(target);
  }
}
