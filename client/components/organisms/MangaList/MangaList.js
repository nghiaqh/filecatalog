import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import MangaCard from '../../molecules/MangaCard';
import { ContentGrid } from '../ContentGrid';
import { WithLoadMore } from '../WithLoadMore';
import { loadMoreMangas } from './actions';


// component
class MangaList extends PureComponent {
  constructor(props) {
    super(props);

    this.renderCard = this.renderCard.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.id = 'manga-list-' + props.uid;
  }

  render() {
    const { searchText, authorId } = this.props;
    const filter = {
      title: searchText,
      authorId: authorId
    };

    return (
      <WithLoadMore
        entityType='mangas'
        render={this.renderGrid}
        loadMore={loadMoreMangas}
        id={this.id}
        filter={filter}
      />
    );
  }

  renderCard(item) {
    return (
      <MangaCard
        key={item.id}
        manga={item}
        onItemClick={this.handleClick}
      />
    );
  }

  renderGrid(items) {
    return (
      <StyledMangaList
        items={items}
        render={this.renderCard}
      />
    )
  }

  handleClick(manga) {
    const target = `/mangas/${manga.id}`;
    this.props.history.push(target);
  }
}

const StyledMangaList = styled(ContentGrid)`
  position: relative;
`;

export default MangaList;
