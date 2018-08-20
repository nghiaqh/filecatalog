import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { Drawer, DrawerContent } from 'rmwc/Drawer';
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
    };
    this.searchAuthor = this.searchAuthor.bind(this);
    this.searchManga = this.searchManga.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthorIfNeeded(this.props.match.params.authorId));
  }

  render() {
    const authorId = parseInt(this.props.match.params.authorId);
    const authors = this.props.authors;
    const mangaListUid = `author-${authorId}`;

    if (
      typeof authors[authorId] !== 'undefined'
      && typeof authors[authorId].id !== 'undefined'
    ) {
      return (
        <React.Fragment>

          <StyledDrawer permanent>
            <DrawerContent>
              <StyledSection>
                <SearchBox onSearch={this.searchAuthor} />
                <br/>
                <AuthorList
                  uid={'author-hub'}
                  searchText={this.state.searchAuthor}
                  history={this.props.history}
                  pageSize={20}
                />
              </StyledSection>
            </DrawerContent>
          </StyledDrawer>

          <StyledSection className='main-content'>
            <SearchBox onSearch={this.searchManga} />
            <MangaList
              uid={mangaListUid}
              authorId={authorId}
              history={this.props.history}
              searchText={this.state.searchManga}
              pageSize={20}
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

const StyledDrawer = styled(Drawer)`
  height: calc(100vh - 64px);
  position: fixed;
  overflow-y: auto;

  @media (max-width: 640px) {
    display: none;
  }
`

const StyledSection = styled('section')`
  .mdc-text-field {
    width: calc(100% - 20px);
    margin: 0 auto;
  }

  &.main-content {
    margin-left: 240px;
    padding: 8px;
    max-width: calc(100% - 240px);

    @media (max-width: 640px) {
      margin-left: 0;
      max-width: 100%;
    }
  }
`

const mapStateToProps = (state) => {
  return {
    authors: state.entities.authors || {}
  };
};

export default connect(mapStateToProps)(AuthorDetail);
