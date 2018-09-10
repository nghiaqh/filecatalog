import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import SearchBox from '../../atoms/SearchBox';
import { AuthorList } from '../../organisms/AuthorList';
import { MangaList } from '../../organisms/MangaList';
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
          <StyledSection className='sidebar'>
            <SearchBox onSearch={this.searchAuthor} placeholder='Search author'/>

            <AuthorList
              uid={'author-hub'}
              searchText={this.state.searchAuthor}
              location={this.props.location}
              pageSize={24}
              order={this.state.authorListOrder}
            />
          </StyledSection>
          <StyledSection className='main-content'>
            <SearchBox
              onSearch={this.searchManga}
              placeholder={`Search manga by ${author.name}`}
            />
            <MangaList
              uid={mangaListUid}
              authorId={authorId}
              history={this.props.history}
              searchText={this.state.searchManga}
              pageSize={30}
              cols={cols}
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
  .mdc-text-field {
    width: calc(100% - 20px);
    margin: 0 auto;
  }

  &.sidebar {
    height: calc(100vh - 64px);
    position: fixed;
    overflow-y: auto;

    @media (max-width: 640px) {
      display: none;
    }
  }

  &.main-content {
    margin-left: 260px;
    max-width: calc(100% - 260px);

    @media (max-width: 640px) {
      margin-left: 0;
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
