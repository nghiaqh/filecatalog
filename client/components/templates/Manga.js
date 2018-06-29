import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import PagesPanel from '../organisms/PagesPanel';
import PagePanel from '../organisms/PagePanel';
import { fetchItems } from '../Datasource';
import { ToolbarFixedAdjust } from 'rmwc/Toolbar';
import { Grid, GridCell } from 'rmwc/Grid';

export default class Manga extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: null,
      manga: null
    };
    this.handlePageSelect = this.handlePageSelect.bind(this);
  }

  componentDidMount() {
    const mangaId = this.props.match.params.mangaId;
    fetchItems('/api/Mangas', { where: { id: mangaId }})
      .then(item => this.setState({ manga: item[0] }));
  }

  render() {
    return (
      <Grid>
        <GridCell span="12">
          <ToolbarFixedAdjust/>
          <PagesPanel
            manga={this.state.manga}
            onItemClick={this.handlePageSelect}
            itemsPerPage={30}
          />
          <PagePanel page={this.state.selectedPage} />
        </GridCell>
      </Grid>
    );
  }

  handlePageSelect(page) {
    this.setState({selectedPage: page});
  }
}
