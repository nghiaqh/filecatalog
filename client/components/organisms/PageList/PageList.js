import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchPagesIfNeeded, fetchPages, countPages } from './actions';
import PaginatorControl from '../../molecules/PaginatorControl';
import ContentGrid from '../ContentGrid';
import PageCard from '../../molecules/PageCard';

// component
export class PageList extends PureComponent {
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
          items={this.props.pages}
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
    const { dispatch, manga } = this.props;
    if (manga.id) {
      dispatch(countPages({manga: manga}));
      dispatch(fetchPagesIfNeeded(12, 1, {manga: manga}));
    }
  }

  renderCard(item) {
    return (
      <PageCard
        key={item.id}
        page={item}
        manga={this.props.manga}
        onItemClick={this.handleClick}
      />
    );
  }

  handlePagination(pageNumber) {
    const { dispatch, manga } = this.props;
    dispatch(fetchPages(12, pageNumber, {manga: manga}));
  }

  handleClick(page) {
    const target = `/pages/${page.id}`;
    this.props.history.push(target);
  }
}

// container
const mapStateToProps = (state) => {
  const { paginator } = state.pageList;
  const { pages } = state.entities;
  const total = parseInt(paginator.total);
  const pageSize = parseInt(paginator.pageSize);
  return {
    pages: paginator.items.map(index => pages[index]),
    total: total,
    totalPages: Math.ceil(total / pageSize),
    pageNumber: paginator.pageNumber
  };
};

export default connect(mapStateToProps)(PageList);
