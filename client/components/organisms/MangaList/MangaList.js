import equal from 'deep-equal';
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
    this.state = {
      id: 'manga-list-' + props.uid,
      filter: {
        title: props.searchText,
        authorId: props.authorId
      }
    };
    this.renderCard = this.renderCard.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
    this.id = 'manga-list-' + props.uid;
  }

  render() {
    return (
      <WithLoadMore
        entityType='mangas'
        render={this.renderGrid}
        loadMore={loadMoreMangas}
        id={this.state.id}
        filter={this.state.filter}
        pageSize={24}
      />
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { uid, searchText, authorId } = this.props;
    const id = `manga-list-${uid}`;
    const filter = {
      title: searchText,
      authorId: authorId
    };

    if (!equal(filter, prevState.filter) || id !== prevState.id) {
      this.setState({ id, filter })
    }
  }

  renderCard(item) {
    return (
      <MangaCard
        key={item.id}
        manga={item}
      />
    );
  }

  renderGrid(items) {
    return (
      <StyledMangaList
        items={items}
        render={this.renderCard}
        cols={this.props.cols}
      />
    )
  }
}

const StyledMangaList = styled(ContentGrid)`
  position: relative;
`;

export default MangaList;
