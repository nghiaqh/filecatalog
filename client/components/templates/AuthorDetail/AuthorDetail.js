import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { AuthorList } from '@organism/AuthorList';
import { MangaList } from '@organism/MangaList';
import SearchBox from '@atom/SearchBox';
import { fetchAuthorIfNeeded } from './actions';

export class AuthorDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchAuthor: '',
      searchManga: '',
      authorListOrder: 'mangasCount DESC'
    };
    this.searchAuthor = this.searchAuthor.bind(this);
    this.searchManga = this.searchManga.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthorIfNeeded(this.props.match.params.authorId));
  }

  render() {
    const { match, authors } = this.props;
    const authorId = parseInt(match.params.authorId);
    const mangaListUid = `author-${authorId}`;
    const author = authors[authorId]

    if (typeof author !== 'undefined') {
      const cols = {
        medium: 3,
        large: 5,
        xlarge: 10
      };

      return (
        <React.Fragment>
          <StyledSection className='main-content'>
            <SearchBox
              type={{fullwidth: true, dense: true}}
              onSearch={this.searchManga}
              placeholder={`Search mangas by ${author.name}`} />
            <MangaList
              uid={mangaListUid}
              authorId={authorId}
              history={this.props.history}
              searchText={this.state.searchManga}
              pageSize={30}
              cols={cols}
            />
          </StyledSection>
          <StyledSection className='sidebar'>
            <SearchBox
              type={{fullwidth: true, dense: true}}
              onSearch={this.searchAuthor}
              placeholder={`Search author`} />
            <AuthorList
              uid={'author-hub'}
              searchText={this.state.searchAuthor}
              location={this.props.location}
              pageSize={24}
              order={this.state.authorListOrder}
              display='list'
            />
          </StyledSection>
        </React.Fragment>
      );
    }
    return null;
  }

  searchAuthor(text) {
    this.setState({ searchAuthor: text });
  }

  searchManga(text) {
    this.setState({ searchManga: text });
  }
}

const StyledSection = styled('section')`
  .search-box {
    width: calc(100% - 20px);
    margin: 0 auto;
  }

  &.sidebar {
    height: calc(100vh - 64px);
    width: 260px;
    float: right;

    @media (max-width: 640px) {
      display: none;
    }
  }

  &.main-content {
    display: inline-block;
    max-width: calc(100% - 260px);

    @media (max-width: 640px) {
      max-width: 100%;
    }
  }
`

const mapStateToProps = (state) => {
  return {
    mangas: state.entities.mangas || {},
    authors: state.entities.authors || {}
  };
};

export default connect(mapStateToProps)(AuthorDetail);
