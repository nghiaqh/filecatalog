import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { MangaList } from '../../organisms/MangaList';
import { fetchAuthorIfNeeded } from './actions';
import SearchBox from '../../atoms/SearchBox';

export class AuthorDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthorIfNeeded(this.props.match.params.authorId));
  }

  render() {
    const authorId = parseInt(this.props.match.params.authorId);
    const authors = this.props.authors;
    const mangaListUid = `author-${authorId}`;

    if (typeof authors[authorId] !== 'undefined' &&
      typeof authors[authorId].id !== 'undefined') {
      return (
        <StyledSection>
          <SearchBox onSearch={this.handleSearch} />
          <MangaList
            uid={mangaListUid}
            authorId={authorId}
            history={this.props.history}
            searchText={this.state.searchText}
          />
        </StyledSection>
      );
    }
    return null;
  }

  handleSearch(text) {
    this.setState({ searchText: text });
  }
}

const StyledSection = styled('section')`
  width: 100%;

  .mdc-text-field {
    width: calc(100% - 20px);
    margin: 0 auto;
  }
`

const mapStateToProps = (state) => {
  return {
    authors: state.entities.authors || {}
  };
};

export default connect(mapStateToProps)(AuthorDetail);
