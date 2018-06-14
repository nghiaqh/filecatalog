import React, { Component } from 'react';
import Author from './Author';

export default class AuthorList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const i = parseInt(e.target.getAttribute('author-index'));
    const author = this.props.authors[i];
    this.props.onAuthorClick(author);
  }

  render() {
    const authors = [];
    const filterText = this.props.filterText.toLowerCase();

    this.props.authors.forEach((author, index) => {
      if (author.name.toLowerCase().indexOf(filterText) === -1) {
        return;
      }

      authors.push(
        <li key={index}>
          <a author-index={index} onClick={this.handleClick}>
            {author.name}
          </a>
        </li>
      );
    });

    return (
      <div>
          <ul>{authors}</ul>
      </div>
    );
  }
}
