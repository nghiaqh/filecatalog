import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { fetchMangasIfNeeded, fetchMangas } from './actions';
import { ElevatedPaginatorControl } from '../../molecules/PaginatorControl';
import ContentGrid from '../ContentGrid';
import MangaCard from '../../molecules/MangaCard';

// component
export class MangaList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pcEvation: 24
    };
    this.renderCard = this.renderCard.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updatePaginatorControlState = this.updatePaginatorControlState.bind(this);
  }

  render() {
    return (
      <StyledMangaList>
        <ContentGrid
          id="main"
          items={this.props.mangas}
          render={this.renderCard}
        />

        <ElevatedPaginatorControl
          z={this.state.pcEvation}
          handlePagination={this.handlePagination}
          pageNumber={this.props.pageNumber}
          totalPages={this.props.totalPages}
        />
      </StyledMangaList>
    );
  }

  componentDidMount() {
    const { dispatch, searchText } = this.props;
    const filter = { title: searchText };
    dispatch(fetchMangasIfNeeded(20, 1, filter));
    document.addEventListener('keydown', this.handleKeyDown);
    this.updatePaginatorControlState();
    window.addEventListener('scroll', this.updatePaginatorControlState);
  }

  componentDidUpdate(prevProps) {
    const { dispatch, searchText, pageSize } = this.props;

    if (searchText !== prevProps.searchText) {
      const filter = { title: searchText };
      dispatch(fetchMangasIfNeeded(pageSize, 1, filter));
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('scroll', this.updatePaginatorControlState);
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

  handlePagination(pageNumber) {
    const { dispatch, searchText, pageSize, totalPages } = this.props;
    const filter = { title: searchText };
    if (pageNumber !== this.props.pageNumber && pageNumber <= totalPages && pageNumber) {
      dispatch(fetchMangas(pageSize, pageNumber, filter));
    }
  }

  handleClick(manga) {
    const target = `/mangas/${manga.id}`;
    this.props.history.push(target);
  }

  handleKeyDown(e) {
    const {pageNumber, totalPages} = this.props;
    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        return this.handlePagination(pageNumber - 1);
      case 39:
        e.preventDefault();
        return this.handlePagination(pageNumber + 1);
      default:
        return;
    }
  }

  updatePaginatorControlState() {
    const el = document.getElementById('main');
    if (!el) return;
    const pageHeight = window.innerHeight;
    const { bottom } = el.getClientRects()[0];
    const x = pageHeight - bottom;
    if (x >= 0 && this.state.pcEvation) {
      this.setState({pcEvation: 0});
    } else if (x < 0 && this.state.pcEvation === 0) {
      this.setState({pcEvation: 24});
    }
  }
}

const StyledMangaList = styled('section')`
  position: relative;
`;

// container
const mapStateToProps = (state) => {
  const { paginator } = state.mangaList;
  const { mangas } = state;
  const total = parseInt(paginator.total);
  const pageSize = parseInt(paginator.pageSize);
  return {
    mangas: paginator.items.map(index => mangas[index]),
    total: total,
    totalPages: Math.ceil(total / pageSize),
    pageNumber: paginator.pageNumber,
    pageSize: pageSize
  };
};

export default connect(mapStateToProps)(MangaList);
