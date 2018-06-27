import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import AuthorList from './AuthorList';
import SearchBox from '../molecules/SearchBox';

const StyledAuthorList = styled(AuthorList)`
  ul {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  li {
    flex-basis: 100%;
  }
`

export default class AuthorsPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchText) {
    this.setState({searchText: searchText});
  }

  render() {
    return (
      <section>
        <h3>Authors</h3>
        <SearchBox onSearch={this.handleSearch} />
        <StyledAuthorList
          searchText={this.state.searchText}
          {...this.props}
        />
      </section>
    );
  }
}
