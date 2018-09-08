import React, { PureComponent } from 'react';
import { Button } from '@rmwc/button';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import MangaPage from '../../atoms/MangaPage';
import { WithPagination } from '../../organisms/WithPagination';
import { fetchMangaIfNeeded } from '../MangaDetail';
import { paginatePages } from './actions';

// component
export class PageViewer extends PureComponent {
  constructor(props) {
    super(props);
    this.id = `page-view-${props.match.params.mangaId}`;
    this.pageRef = React.createRef();

    this.renderPage = this.renderPage.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.togglePageFullScreen = this.togglePageFullScreen.bind(this);
  }

  render() {
    const { mangaId, pageNumber } = this.props.match.params;
    const filter = {
      mangaId: parseInt(mangaId)
    };

    return (
      <React.Fragment>
        <StyledButton dense onClick={this.togglePageFullScreen}>
          Toggle fullscreen [F]
        </StyledButton>
        <WithPagination
          entityType='pages'
          render={this.renderPage}
          load={paginatePages}
          id={this.id}
          filter={filter}
          pageNumber={pageNumber}
          pageSize={1}
          onAfter={this.handlePagination}
        />
      </React.Fragment>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { mangaId } = this.props.match.params;
    dispatch(fetchMangaIfNeeded(mangaId));
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  renderPage(items) {
    return (
      <div id='page-viewer'>
        <MangaPage
          page={items[0]}
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
          onClick={this.handlePageClick}
        />
      </div>
    );
  }

  handlePagination(number) {
    const { mangaId } = this.props.match.params;
    const { withPagination } = this.props;
    const { total, pageSize } = withPagination[this.id];
    const totalPages = Math.ceil(total / pageSize);

    if ( 0 <= number && number <= totalPages) {
      const target = `/mangas/${mangaId}/${number}`;
      this.props.history.push(target);
    }
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'f':
        e.preventDefault();
        return this.togglePageFullScreen();
    }
  }

  handleTouchStart(e) {
    this.touchstartX = e.changedTouches[0].screenX;
  }

  handleTouchEnd(e) {
    this.touchendX = e.changedTouches[0].screenX;
    const pageNumber = parseInt(this.props.match.params.pageNumber);
    let x = this.touchendX - this.touchstartX;
    if (x < -100) {
      this.handlePagination(pageNumber + 1);
    } else if (x > 100) {
      this.handlePagination(pageNumber - 1);
    }
  }

  handlePageClick(e) {
    e.preventDefault();
    const { pageNumber } = this.props.match.params;
    this.handlePagination(parseInt(pageNumber) + 1);
  }

  togglePageFullScreen() {
    const el = document.getElementById('page-viewer');
    return this.toggleFullscreen(el);
  }

  toggleFullscreen(element) {
    const fsPrefixes = [
      'fullscreenEnabled',
      'webkitFullscreenEnabled',
      'mozFullscreenEnabled',
      'msFullscreenEnabled'
    ];
    const fePrefixes = [
      'fullscreenElement',
      'webkitFullscreenElement',
      'mozFullScreenElement',
      'msFullscreenElement'
    ];
    const efPrefixes = [
      'exitFullscreen',
      'webkitExitFullscreen',
      'mozCancelFullScreen',
      'msExitFullscreen'
    ];

    const fs = fsPrefixes.filter(fs => element[fs]);
    const fe = fePrefixes.filter(fe => element[fe]);
    const ef = efPrefixes.filter(ef => document[ef]);

    if (element[fs] && !element[fe]) {
      element[fe]();
    } else if (document[ef]) {
      document[ef]();
    }

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }
}

const StyledButton = styled(Button)`
  display: block;
  margin: 10px auto;
`

// container
const mapStateToProps = (state) => {
  const { mangas, pages } = state.entities;
  return {
    pages,
    mangas,
    withPagination: state.withPagination
  };
};

export default connect(mapStateToProps)(PageViewer);
