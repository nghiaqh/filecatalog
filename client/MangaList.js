import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

export default class MangaList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mangas = [];
    this.props.mangas.forEach((manga, index) => {
      mangas.push(
        <li key={index}>
          <b>manga: </b>
          <Link to={{
            pathname: `/mangas/${manga.id}`,
            state: { manga: manga }
          }}>
            {manga.title}
          </Link>
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
