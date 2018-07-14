import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { Button } from 'rmwc/Button';
import { Elevation } from 'rmwc/Elevation';
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
    this.state = {
      pcEvation: 24
    };
    this.renderCard = this.renderCard.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.switchToPageView = this.switchToPageView.bind(this);
    this.switchToGridView = this.switchToGridView.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updatePaginatorControlState = this.updatePaginatorControlState.bind(this);
  }

  render() {
    const content = this.renderContent();
    return (
      <StyledPageList>
        {this.props.display.type === 'page' ?
        <Button className='' dense onClick={this.switchToGridView}>
          Show thumbnails
        </Button>
        : ''}

        {content}

        <StyledElevation
          z={this.state.pcEvation}
          transition
          >
          <PaginatorControl
            handlePagination={this.handlePagination}
            pageNumber={this.props.pageNumber}
            totalPages={this.props.totalPages}
          />
        </StyledElevation>
      </StyledPageList>
    );
  }

  componentDidMount() {
    const { dispatch, manga, display } = this.props;
    if (manga.id) {
      const pageSize = display.type === 'grid' ? 12 : 1;
      dispatch(fetchPagesIfNeeded(pageSize, 1, {mangaId: manga.id}));
      document.addEventListener('keydown', this.handleKeyDown);
      this.updatePaginatorControlState();
      window.addEventListener('scroll', this.updatePaginatorControlState);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('scroll', this.updatePaginatorControlState);
  }

  renderContent() {
    switch (this.props.display.type) {
      case 'page':
        return (
          <Page
            id='main'
            page={this.props.pages[0]}
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
            onClick={this.handleClick}
          />);
      default:
        return (
          <ContentGrid
            id='main'
            items={this.props.pages}
            render={this.renderCard}
          />);
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
    const { dispatch, manga, pageSize, totalPages } = this.props;
    if (pageNumber !== this.props.pageNumber && pageNumber <= totalPages && pageNumber) {
      dispatch(fetchPages(pageSize, pageNumber, {mangaId: manga.id}));
    }
  }

  switchToPageView(page) {
    const { dispatch, manga } = this.props;
    dispatch(changeDisplay({type: 'page'}, 1, page.number, {mangaId: manga.id}));
  }

  switchToGridView() {
    const { dispatch, manga } = this.props;
    dispatch(changeDisplay({type: 'grid'}, 1, 1, {mangaId: manga.id}));
    dispatch(fetchPages(12, 1, {mangaId: manga.id}));
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

  handleClick(e) {
    e.preventDefault();
    this.handlePagination(this.props.pageNumber + 1);
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

const StyledPageList = styled('section')`
  text-align: center;
  width: 100%;
`;

const StyledElevation = styled(Elevation)(props => `
  background: ${props.z ? 'var(--mdc-theme-secondary)' : 'transparent'};
  position: ${props.z ? 'fixed' : 'relative'};
  bottom: 0;
  height: 60px;
  width: 170px;
  left: 50%;
  margin-left: -85px;
  padding-bottom: 10px;
`);
