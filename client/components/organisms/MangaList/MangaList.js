import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchMangasIfNeeded, fetchMangas, countMangas } from './actions';
import PaginatorControl from '../../molecules/PaginatorControl';
import ContentGrid from '../ContentGrid';
import MangaCard from '../../molecules/MangaCard';

// component
export class MangaList extends PureComponent {
  constructor(props) {
    super(props);
    this.renderCard = this.renderCard.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div>
        <ContentGrid
          items={this.props.mangas}
          render={this.renderCard}
        />
        <PaginatorControl
          handlePagination={this.handlePagination}
          pageNumber={this.props.pageNumber}
          totalPages={this.props.totalPages}
        />
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(countMangas());
    dispatch(fetchMangasIfNeeded());
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
    const { dispatch } = this.props;
    dispatch(fetchMangas(12, pageNumber));
  }

  handleClick(manga) {
    const target = `/mangas/${manga.id}`;
    this.props.history.push(target);
  }
}

// container
const mapStateToProps = (state) => {
  const { paginator } = state.mangaList;
  const { mangas } = state.entities;
  const total = parseInt(paginator.total);
  const pageSize = parseInt(paginator.pageSize);
  return {
    mangas: paginator.items.map(index => mangas[index]),
    total: total,
    totalPages: Math.ceil(total / pageSize),
    pageNumber: paginator.pageNumber
  };
};

export default connect(mapStateToProps)(MangaList);
