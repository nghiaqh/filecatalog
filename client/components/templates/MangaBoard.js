import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import AuthorsPanel from '../organisms/AuthorsPanel';
import MangasPanel from '../organisms/MangasPanel';
import PagesPanel from '../organisms/PagesPanel';
import PagePanel from '../organisms/PagePanel';
import { ToolbarFixedAdjust } from 'rmwc/Toolbar';
import { Grid, GridCell } from 'rmwc/Grid';

const StyledGridCell = styled(GridCell)`
  padding: 5px;
`;

export default class MangaBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedAuthor: null,
      selectedManga: null,
      selectedPage: null
    };
    this.handleAuthorSelect = this.handleAuthorSelect.bind(this);
    this.resetAuthorSelect = this.handleAuthorSelect.bind(this);
    this.handleMangaSelect = this.handleMangaSelect.bind(this);
    this.handlePageSelect = this.handlePageSelect.bind(this);
  }

  handleAuthorSelect(author) {
    this.setState({selectedAuthor: author});
  }

  resetAuthorSelect(author) {
    this.setState({selectedAuthor: null});
  }

  handleMangaSelect(manga) {
    this.setState({selectedManga: manga});
  }

  handlePageSelect(page) {
    this.setState({selectedPage: page});
  }

  render() {
    return (
      <article>
        <ToolbarFixedAdjust/>
        <Grid>
          <StyledGridCell span="12">
            <h1 className="text-center">Manga Dashboard</h1>
          </StyledGridCell>
          <StyledGridCell span="4">
            <AuthorsPanel
              onItemClick={this.handleAuthorSelect}
              itemsPerPage={12}
            />
          </StyledGridCell>
          <StyledGridCell span="4" desktop="8">
            <MangasPanel
              resetAuthor={this.resetAuthorSelect}
              onItemClick={this.handleMangaSelect}
              author={this.state.selectedAuthor}
              itemsPerPage={12}
            />
          </StyledGridCell>
          <StyledGridCell span="4">
            <PagesPanel
              manga={this.state.selectedManga}
              onItemClick={this.handlePageSelect}
              itemsPerPage={12}
            />
          </StyledGridCell>
          <StyledGridCell span="4" desktop="8">
            <PagePanel page={this.state.selectedPage} />
          </StyledGridCell>
        </Grid>
      </article>
    );
  }
}
