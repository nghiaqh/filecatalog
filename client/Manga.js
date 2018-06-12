import React, { Component } from 'react';
import PageList from './PageList';

export default class Manga extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const id = this.props.match.params.mangaId;
    const title = this.props.location.state.manga.title;

    return (
      <div>
          <h1>manga {title}</h1>
          <PageList mangaId={id}/>
      </div>
    );
  }
}
