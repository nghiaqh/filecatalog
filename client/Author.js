import React, { Component } from 'react';
import MangaList from './MangaList';

export default class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mangas: []
    }
  }

  componentWillMount() {
    fetch(`/api/Mangas?filter=%7B"where"%3A%7B"authorId"%3A${this.props.author.id}%7D%7D`)
      .then(res => res.json())
      .then(mangas => this.setState({ mangas: mangas }));
  }

  render() {
    const author = this.props.author;

    return (
      <div>
          <b>author:</b> {author.name}
          <MangaList mangas={this.state.mangas}/>
      </div>
    );
  }
}
