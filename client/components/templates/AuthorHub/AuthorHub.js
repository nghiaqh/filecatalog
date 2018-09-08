import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import SearchBox from '../../atoms/SearchBox';
import { AuthorList } from '../../organisms/AuthorList';

export default class AuthorHub extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      authorListOrder: 'mangasCount DESC'
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  render() {
    return (
      <StyledAuthorHub>
        <SearchBox onSearch={this.handleSearch} />

        <AuthorList
          uid={'author-hub'}
          searchText={this.state.searchText}
          history={this.props.history}
          order={this.state.authorListOrder}
        />
      </StyledAuthorHub>
    );
  }

  handleSearch(text) {
    this.setState({ searchText: text });
  }
}

const StyledAuthorHub = styled('section')`
  width: 100%;

  .mdc-text-field {
    width: calc(100% - 20px);
    margin: 0 auto;
  }
`;
