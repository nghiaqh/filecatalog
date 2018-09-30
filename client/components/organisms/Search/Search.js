import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { forceCheck } from 'react-lazyload';

import { IconButton } from '@rmwc/icon-button';
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

    this.renderList = this.renderList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }

  render() {
    const searchBar = this.renderSearchBar.bind(this)();
    const mangaList = this.renderList(MangaList, ['Recent mangas', 'Mangas']);
    const authorList = this.renderList(AuthorList, ['Highlight Authors', 'Authors']);

    return (
      <SearchPanel aria-hidden={!this.props.open}>
        <div key='search-panel' className='search-panel'>
          <IconButton icon='close' label='Close search'
            className='close-search-btn'
            onClick={this.closeSearch} />
          {searchBar}

          <Grid>
            {mangaList}
            {authorList}
          </Grid>
        </div>
      </SearchPanel>
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
      <SearchBox
        outlined
        onSearch={this.handleSearch}
        label='Search mangas &amp; authors' />
    );
  }

  renderList(ListComponent, headlines) {
    const headline = this.state.searchText === '' ? headlines[0] : headlines[1];
    return (
      <div className='content-list'>
        <Typography use="overline" tag="h3">{headline}</Typography>
        <ListComponent
          uid='search'
          searchText={this.state.searchText}
          pageSize={10}
          display='list' />
      </div>
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
    transition: opacity .3s, z-index 0s .3s;
    width: 100vw;
    z-index: -1;
    opacity: 0;
  }

  &[aria-hidden="false"] {
    transition: opacity .3s;
    width: 100%;
    z-index: 5;
    opacity: 1;
  }

  .search-panel {
    overflow: auto;
  }

  .close-search-btn {
    float: right;
    margin: 10px;
  }

  .search-box {
    display: flex;
    width: 92%;
    max-width: 960px;
    margin: 40px auto;
    clear: both;
    overflow: hidden;
  }

  .content-list {
    > h3 {
      text-transform: uppercase;
      font-weight: bold;
    }
  }
`);

const Grid = styled('section')`
  display: grid;
  grid-gap: 15px;
  grid-template-rows: auto;
  grid-template-columns: repeat(1, calc(100% - 15px));
  padding: 15px;
  max-width: 960px;
  margin: 0 auto;

  @media (min-width: 400px) {
    grid-template-columns: repeat(2, calc((100% - 15px) / 2));
  }
`;
