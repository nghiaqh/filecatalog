import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import SearchBox from '../../atoms/SearchBox';
import { MangaList } from '../../organisms/MangaList';

export default class MangaHub extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  render() {
    return (
      <StyledMangaHub>
        <SearchBox onSearch={this.handleSearch} />
        <br/>
        <MangaList
          uid='manga-hub'
          searchText={this.state.searchText}
          history={this.props.history}
        />
      </StyledMangaHub>
    );
  }

  handleSearch(text) {
    this.setState({ searchText: text });
  }
}

const StyledMangaHub = styled('section')`
  width: 100%;

  .mdc-text-field {
    width: calc(100% - 20px);
    margin: 0 auto;
  }
`;
