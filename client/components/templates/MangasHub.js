import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import MangasPanel from '../organisms/MangasPanel';
import { ToolbarFixedAdjust } from 'rmwc/Toolbar';
import { Grid, GridCell } from 'rmwc/Grid';

export default class MangasHub extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedManga: null,
    };
    this.handleMangaSelect = this.handleMangaSelect.bind(this);
  }

  render() {
    return (
      <Grid>
        <GridCell span="12">
          <ToolbarFixedAdjust/>
          <MangasPanel
            onItemClick={this.handleMangaSelect}
            itemsPerPage={30}
          />
        </GridCell>
      </Grid>
    );
  }

  handleMangaSelect(manga) {
    this.setState({selectedManga: manga});
    const target = `/mangas/${manga.id}`;
    this.props.history.push(target);
  }
}
