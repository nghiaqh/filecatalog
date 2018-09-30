import debounce from 'lodash/debounce';

import React, { PureComponent } from 'react';
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
    const searchBar = this.renderSearchBar.bind(this)();
    const mangaList = this.renderMangaList();
    const authorList = this.renderAuthorList();

    return (
      <SearchPanel aria-hidden={!this.props.open}>
        <div key='search-panel' className='search-panel'>
          {searchBar}
          {mangaList}
          {authorList}
        </div>
      </SearchPanel>
    );
  }

  componentDidUpdate(prevProps) {
    const openChanged = prevProps.open !== this.props.open;
    if (openChanged && this.props.open && this.state.forceCheck) {
      // forceCheck();
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
            <ToolbarIcon
              icon="menu"
              onClick={this.props.onClickMenuIcon} />
            <SearchBox
              type={{outlined: true, dense: true}}
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
          pageSize={12}
          display='grid' />
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
  position: fixed;
  overflow-y: scroll;
  top: 0; left: 0; top: 0; bottom: 0;
  background: #fff;

  &[aria-hidden="true"] {
    transition: opacity 1s, z-index 0s 1s;
    width: 100vw;
    z-index: -1;
    opacity: 0;
  }

  &[aria-hidden="false"] {
    transition: opacity 1s;
    width: 100%;
    z-index: 5;
    opacity: 1;
  }

  .search-panel {
    > h1,
    > h3 {
      padding: 0 10px;
    }
  }

  .toolbar {
    height: 64px;
  }

  .search-box {
    width: 90%;
    margin: 0 auto;

    input {
      background-color: #fff !important;
      border-radius: 4px;
    }
  }
`);
