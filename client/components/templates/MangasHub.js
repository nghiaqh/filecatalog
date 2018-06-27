import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import MangasPanel from '../organisms/MangasPanel';

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
      <article>
        <h1 className="text-center">Mangas</h1>
        <MangasPanel
          onItemClick={this.handleMangaSelect}
          itemsPerPage={30}
        />
      </article>
    );
  }

  handleMangaSelect(manga) {
    this.setState({selectedManga: manga});
    const target = `/mangas/${manga.id}`;
    this.props.history.push(target);
  }
}
