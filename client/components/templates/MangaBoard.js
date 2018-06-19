import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import AuthorsPanel from '../organisms/AuthorsPanel';
import MangasPanel from '../organisms/MangasPanel';
import PagesPanel from '../organisms/PagesPanel';
import PagePanel from '../organisms/PagePanel';

const FlexContainer = styled('div')`
  display: flex;
  flex-direction: column;

  section {
    border: 1px solid #999;
    box-sizing: border-box;
    padding: 10px;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;

    > section:nth-child(2) {
      flex-basis: 40%;
    }
    > section:nth-child(3) {
      flex-basis: 60%;
    }
    > h1,
    > section:nth-child(4),
    > section:nth-child(5) {
      flex-basis: 100%;
    }
  }
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
    this.handleMangaSelect = this.handleMangaSelect.bind(this);
    this.handlePageSelect = this.handlePageSelect.bind(this);
  }

  handleAuthorSelect(author) {
    this.setState({selectedAuthor: author});
  }

  handleMangaSelect(manga) {
    this.setState({selectedManga: manga});
  }

  handlePageSelect(page) {
    this.setState({selectedPage: page});
  }

  render() {
    return (
      <FlexContainer>
        <h1>{this.constructor.name}</h1>
        <AuthorsPanel
          onItemClick={this.handleAuthorSelect}
          itemsPerPage={12}
        />
        <MangasPanel
          resetAuthor={() => this.handleAuthorSelect(null)}
          onItemClick={this.handleMangaSelect}
          author={this.state.selectedAuthor}
          itemsPerPage={24}
        />
        <PagesPanel
          manga={this.state.selectedManga}
          onItemClick={this.handlePageSelect}
          itemsPerPage={12}
        />
        <PagePanel page={this.state.selectedPage} />
      </FlexContainer>
    );
  }
}
