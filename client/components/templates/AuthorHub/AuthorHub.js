import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import SearchBox from '../../atoms/SearchBox';
import { AuthorList } from '../../organisms/AuthorList';

export default class AuthorHub extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  render() {
    return (
      <StyledAuthorHub>
        <SearchBox onSearch={this.handleSearch} />
        <br/>
        <AuthorList
          searchText={this.state.searchText}
          history={this.props.history}
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