import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import MangaCard from '../../molecules/MangaCard';
import { WithLoadMore } from '../WithLoadMore';
import { ContentGrid } from '../ContentGrid';
import { loadMoreMangas } from './actions';


// component
export class MangaList extends PureComponent {
  constructor(props) {
    super(props);

    this.renderCard = this.renderCard.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.id = 'manga-list-' + props.uid;
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
    const mangas = Array.isArray(items) ? items.map(i => entities.mangas[i]) : [];
    const totalPages = Math.ceil(total / pageSize);
    return (
      <WithLoadMore
        items={mangas}
        render={this.renderGrid}
        loadMore={this.loadMore}
        totalPages={totalPages || 1}
        pageNumber={pageNumber || 1}
      />
    );
  }

  componentDidMount() {
    const { dispatch, searchText, authorId } = this.props;
    const filter = {
      title: searchText,
      authorId: authorId
    };

    dispatch(loadMoreMangas(this.id, 20, 1, filter));
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const {
      dispatch,
      searchText,
      authorId,
      withLoadMore
    } = this.props;

    if (
      searchText !== prevProps.searchText ||
      authorId !== prevProps.authorId
    ) {
      const filter = { title: searchText, authorId: authorId };
      const { pageSize } = withLoadMore[this.id];
      dispatch(loadMoreMangas(this.id, pageSize, 1, filter));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  loadMore(number) {
    const { dispatch, withLoadMore } = this.props;
    const { pageNumber, total, pageSize, filter } = withLoadMore[this.id];
    const totalPages = Math.ceil(total / pageSize);
    if (number && number !== pageNumber && number <= totalPages) {
      dispatch(loadMoreMangas(this.id, pageSize, number, filter));
    }
  }

  handleClick(manga) {
    const target = `/mangas/${manga.id}`;
    this.props.history.push(target);
  }

  handleScroll() {

  }
}

const StyledMangaList = styled(ContentGrid)`
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

export default connect(mapStateToProps)(MangaList);
