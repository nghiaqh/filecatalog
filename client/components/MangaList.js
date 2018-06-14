import React, { Component } from 'react';

export default class MangaList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const i = parseInt(e.target.getAttribute('manga-index'));
    const manga = this.props.mangas[i];
    this.props.onMangaClick(manga);
  }

  render() {
    const mangas = [];
    const filterText = this.props.filterText.toLowerCase();
    const author = this.props.author;

    this.props.mangas.forEach((manga, index) => {
      if (manga.title.toLowerCase().indexOf(filterText) === -1) {
        return;
      }

      if (author && manga.authorId !== author.id) {
        return;
      }

      mangas.push(
        <li key={index}>
          <a manga-index={index} onClick={this.handleClick}>
            {manga.title}
          </a>
        </li>
      );
    });

    return (
      <div>
        <ul>{mangas}</ul>
      </div>
    );
  }
}
