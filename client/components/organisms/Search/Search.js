import debounce from 'lodash/debounce';

import React, { PureComponent } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'react-emotion';
import { forceCheck } from 'react-lazyload';

import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarIcon
} from '@rmwc/toolbar';
import { Typography } from '@rmwc/typography';

import { AuthorList } from '@organism/AuthorList';
import { MangaList } from '@organism/MangaList';
import SearchBox from '@atom/SearchBox';

export default class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      type: ['manga', 'author'],
      forceCheck: true
    };
    this.handleSearch = debounce(this.handleSearch.bind(this), 500);
    this.closeSearch = this.closeSearch.bind(this);
  }

  render() {
    const style = { display: this.props.open ? 'block' : 'none' };
    const searchBar = this.renderSearchBar.bind(this)();
    const mangaList = this.renderMangaList();
    const authorList = this.renderAuthorList();

    return (
      <ReactCSSTransitionGroup
        transitionName="overlay"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <SearchPanel key='search-panel' style={style}>
          <div className='search-content'>
            {searchBar}
            {mangaList}
            {authorList}
          </div>
        </SearchPanel>
      </ReactCSSTransitionGroup>
    );
  }

  componentDidUpdate(prevProps) {
    const openChanged = prevProps.open !== this.props.open;
    if (openChanged && this.props.open && this.state.forceCheck) {
      forceCheck();
      this.setState({ forceCheck: false });
    }

    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.closeSearch();
    }
  }

  renderSearchBar() {
    return (
      <Toolbar className='toolbar'>
        <ToolbarRow>
          <ToolbarSection>
            <SearchBox
              onSearch={this.handleSearch}
              placeholder='Search mangas, authors' />
            <ToolbarIcon icon="clear" label="Close search"
              onClick={this.closeSearch} />
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>
    );
  }

  renderMangaList() {
    return (
      <React.Fragment>
        <Typography use="headline6" tag="h3">Mangas</Typography>
        <MangaList
          uid='search'
          searchText={this.state.searchText}
          history={this.props.history}
          pageSize={12} />
      </React.Fragment>
    );
  }

  renderAuthorList() {
    return (
      <React.Fragment>
        <Typography use="headline6" tag="h3">Authors</Typography>
        <AuthorList
          uid='search'
          searchText={this.state.searchText}
          history={this.props.history}
          pageSize={6} />
      </React.Fragment>
    );
  }

  handleSearch(text) {
    this.setState({ searchText: text });
  }

  closeSearch(e) {
    if (e) e.preventDefault();
    this.props.onClose();
  }
}

const SearchPanel = styled('section')(props => `
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 99999;

  .search-content {
    height: 100%;
    overflow: auto;
  }

  .toolbar {
    height: 64px;
  }

  .search-box {
    width: 100%;

    input {
      background-color: #fff !important;
      border-radius: 4px;
    }
  }

  .search-content > h1,
  .search-content > h3 {
    padding: 0 10px;
  }
`);
