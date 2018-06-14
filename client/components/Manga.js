import React, { Component } from 'react';
import PageList from './PageList';

export default class Manga extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const title = this.props.manga.title;

    return (
      <div>
          <h1>manga {title}</h1>
      </div>
    );
  }
}
