import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid, GridCell } from 'rmwc/Grid';
import { PageList } from '../../organisms/PageList/index';

export class MangaDetail extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const mangaId = this.props.match.params.mangaId;
    const manga = this.props.mangas[mangaId];
    return (
      <Grid>
        <GridCell span="12">
          <PageList
            manga={manga}
          />
        </GridCell>
      </Grid>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    mangas: state.entities.mangas
  };
};

export default connect(mapStateToProps)(MangaDetail);
