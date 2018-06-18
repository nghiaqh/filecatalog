import React, { PureComponent } from 'react';
import AuthorsPanel from '../organisms/AuthorsPanel';
import MangasPanel from '../organisms/MangasPanel';
import PagesPanel from '../organisms/PagesPanel';
import PagePanel from '../organisms/PagePanel';
import hasSearchBox from '../hasSearchBox';

const AuthorsPanelWithSearch = hasSearchBox(AuthorsPanel);
const MangasPanelWithSearch = hasSearchBox(MangasPanel);

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
      <div>
        <h1>{this.constructor.name}</h1>
        <div>
          <AuthorsPanelWithSearch
            onItemClick={this.handleAuthorSelect}
          />
          <MangasPanelWithSearch
            onItemClick={this.handleMangaSelect}
            author={this.state.selectedAuthor}
          />
          <PagesPanel
            manga={this.state.selectedManga}
            onItemClick={this.handlePageSelect}
          />
          <PagePanel page={this.state.selectedPage} />
        </div>
      </div>
    );
  }
}
