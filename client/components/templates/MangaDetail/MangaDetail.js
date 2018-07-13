import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid, GridCell } from 'rmwc/Grid';
import { PageList } from '../../organisms/PageList/index';
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
    const mangaId = this.props.match.params.mangaId;
    const mangas = this.props.mangas;

    if (mangas && mangas[mangaId].id) {
      return (
        <Grid>
          <GridCell span="12">
            <PageList
              manga={mangas[mangaId]}
            />
          </GridCell>
        </Grid>
      );
    } else {
      return '';
    }
  }

}

const mapStateToProps = (state) => {
  return {
    mangas: state.entities.mangas
  };
};

export default connect(mapStateToProps)(MangaDetail);
