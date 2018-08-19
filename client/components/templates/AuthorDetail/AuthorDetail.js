import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { Grid, GridCell, GridInner } from 'rmwc/Grid';
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
        <Grid>
          <GridCell span="0" tablet="6" desktop="9">
            <StyledSection>
              <SearchBox onSearch={this.searchManga} />
              <MangaList
                uid={mangaListUid}
                authorId={authorId}
                history={this.props.history}
                searchText={this.state.searchManga}
              />
            </StyledSection>
          </GridCell>
          <GridCell phone="0" tablet="2" desktop="3">
            <StyledSection>
              <SearchBox onSearch={this.searchAuthor} />
              <br/>
              <AuthorList
                uid={'author-hub'}
                searchText={this.state.searchAuthor}
                history={this.props.history}
              />
            </StyledSection>
          </GridCell>
        </Grid>
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
