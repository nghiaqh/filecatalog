import React, { Component } from 'react';
import Author from './Author';

export default class AuthorList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const authors = [];
    this.props.authors.forEach((author, index) => {
      authors.push(
        <li key={index}>
          <Author author={author}/>
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
