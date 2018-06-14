import React, { Component } from 'react';
import AuthorsPanel from './AuthorsPanel';
import MangasPanel from './MangasPanel';
import PagesPanel from './PagesPanel';
import PagePanel from './PagePanel';
import withSearchBox from './withSearchBox';

export default class MangaBoard extends Component {
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
    this.setState({
      selectedPage: page
    });
  }

  render() {
    return (
      <div>
        <h1>{this.constructor.name}</h1>
        <div>
          <AuthorsPanelWithSearchBox
            onAuthorSelect={this.handleAuthorSelect}
          />
          <MangasPanelWithSearchBox
            onMangaSelect={this.handleMangaSelect}
            author={this.state.selectedAuthor}
          />
          <PagesPanel
            manga={this.state.selectedManga}
            onPageSelect={this.handlePageSelect}
          />
          <PagePanel page={this.state.selectedPage} />
        </div>
      </div>
    );
  }
}

const AuthorsPanelWithSearchBox = withSearchBox(AuthorsPanel);
const MangasPanelWithSearchBox = withSearchBox(MangasPanel);
