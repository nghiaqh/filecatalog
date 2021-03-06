import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Typography } from '@rmwc/typography';
import { PageList } from '@organism/PageList';
import { MangaList } from '@organism/MangaList';
import { fetchMangaIfNeeded } from './actions';

export class MangaDetail extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMangaIfNeeded(this.props.match.params.mangaId));
  }

  render() {
    const { match, mangas, authors } = this.props;
    const mangaId = parseInt(match.params.mangaId);

    if (typeof mangas[mangaId] !== 'undefined') {
      const { authorId } = mangas[mangaId]
      const pageListUid = `manga-${mangaId}`;
      const author = authors[authorId];
      const headline = `Mangas by ${author ? author.name : 'same author'}`;

      return (
        <React.Fragment>
          <PageList
            uid={pageListUid}
            manga={mangas[mangaId]}
            history={this.props.history}
          />
          <StyledSection>
            <Typography use="headline5">{headline}</Typography>
            <MangaList
              uid={`author-${authorId}`}
              history={this.props.history}
              authorId={authorId}
            />
          </StyledSection>
        </React.Fragment>
      );
    }
    return null;
  }

}

const StyledSection = styled('section')`
  margin: 40px auto;

  span[class^="mdc-typography"] {
    margin-left: 10px;
  }
`

const mapStateToProps = (state) => {
  return {
    mangas: state.entities.mangas || {},
    authors: state.entities.authors || {}
  };
};

export default connect(mapStateToProps)(MangaDetail);
