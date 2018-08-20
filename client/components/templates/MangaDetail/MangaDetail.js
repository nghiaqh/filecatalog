import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Typography } from 'rmwc/Typography';
import { PageList } from '../../organisms/PageList';
import { MangaList } from '../../organisms/MangaList';
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
    const mangaId = parseInt(this.props.match.params.mangaId);
    const mangas = this.props.mangas;
    const pageListUid = `manga-${mangaId}`;
    if (typeof mangas[mangaId] !== 'undefined' &&
      typeof mangas[mangaId].id !== 'undefined') {
      const { authorId } = mangas[mangaId]
      return (
        <React.Fragment>
          <PageList
            uid={pageListUid}
            manga={mangas[mangaId]}
            history={this.props.history}
          />
          <StyledSection>
            <Typography use="headline5">From same author</Typography>
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
    mangas: state.entities.mangas || {}
  };
};

export default connect(mapStateToProps)(MangaDetail);
