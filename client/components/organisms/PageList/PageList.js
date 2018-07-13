import React, { PureComponent } from 'react';
import { Button } from 'rmwc/Button';
import { connect } from 'react-redux';
import { fetchPagesIfNeeded, fetchPages, countPages, changeDisplay } from './actions';
import PaginatorControl from '../../molecules/PaginatorControl';
import ContentGrid from '../ContentGrid';
import PageCard from '../../molecules/PageCard';
import Page from '../../molecules/Page';

// component
export class PageList extends PureComponent {
  constructor(props) {
    super(props);
    this.renderCard = this.renderCard.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.switchToPageView = this.switchToPageView.bind(this);
    this.switchToGridView = this.switchToGridView.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  render() {
    const content = this.renderContent();
    return (
      <div>
        {content}
        <PaginatorControl
          handlePagination={this.handlePagination}
          pageNumber={this.props.pageNumber}
          totalPages={this.props.totalPages}
        />
        {this.props.display.type === 'page' ?
        <Button dense onClick={this.switchToGridView}>Show thumbnails</Button>
        : ''}
      </div>
    );
  }

  componentDidMount() {
    const { dispatch, manga } = this.props;
    if (manga.id) {
      dispatch(countPages({manga: manga}));
      dispatch(fetchPagesIfNeeded(12, 1, {manga: manga}));
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  renderContent() {
    switch (this.props.display.type) {
      case 'page':
        return <Page
          className='manga-page__large'
          page={this.props.pages[0]}
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
          />
      default:
        return <ContentGrid
          items={this.props.pages}
          render={this.renderCard}
        />
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

  handlePagination(pageNumber) {
    const { dispatch, manga, pageSize } = this.props;
    dispatch(fetchPages(pageSize, pageNumber, {manga: manga}));
  }

  switchToPageView(page) {
    const { dispatch, manga } = this.props;
    dispatch(changeDisplay({type: 'page'}, 1, page.number, {manga: manga}));
  }

  switchToGridView() {
    const { dispatch, manga } = this.props;
    dispatch(changeDisplay({type: 'grid'}, 1, 1, {manga: manga}));
    dispatch(fetchPages(12, 1, {manga: manga}));
  }

  handleKeyDown(e) {
    const {pageNumber, totalPages} = this.props;
    if (e.keyCode === 37 && pageNumber > 1) {
      e.preventDefault();
      this.handlePagination(pageNumber - 1);
    } else if (e.keyCode === 39 && pageNumber < totalPages) {
      e.preventDefault();
      this.handlePagination(pageNumber + 1);
    }
  }

  handleTouchStart(e) {
    this.touchstartX = e.changedTouches[0].screenX;
  }

  handleTouchEnd(e) {
    this.touchendX = e.changedTouches[0].screenX;
    const {pageNumber, totalPages} = this.props;
    let x = this.touchendX - this.touchstartX;
    if (x < -200 && pageNumber < totalPages) {
      this.handlePagination(pageNumber + 1);
    } else if (x > 200 && pageNumber > 1) {
      this.handlePagination(pageNumber - 1);
    }
  }
}

// container
const mapStateToProps = (state) => {
  const { paginator, display } = state.pageList;
  const { pages } = state.entities;
  const total = parseInt(paginator.total);
  const pageSize = parseInt(paginator.pageSize);
  return {
    pages: paginator.items.map(index => pages[index]),
    total: total,
    totalPages: Math.ceil(total / pageSize),
    pageNumber: paginator.pageNumber,
    pageSize: pageSize,
    display: display
  };
};

export default connect(mapStateToProps)(PageList);
