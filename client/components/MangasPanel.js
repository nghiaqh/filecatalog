import React, { Component } from 'react';
import MangaList from './MangaList';
import SearchBox from './SearchBox';

export default class MangasPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      mangas: []
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleMangaClick = this.handleMangaClick.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({filterText: filterText});
  }

  handleMangaClick(manga) {
    this.props.onMangaSelect(manga);
  }

  componentDidMount() {
    let api = '/api/Mangas';
    if (this.props.author) {
      api += `?filter=%7B"where"%3A%7B"authorId"%3A${this.props.author.id}%7D%7D`;
    }

    fetch(api)
      .then(res => res.json())
      .then(mangas => this.setState({ mangas: mangas }));
  }

  render() {
    const author = this.props.author;

    return (
      <div>
        <h2>{this.constructor.name}</h2>
        <SearchBox
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />

        {author ? (<h3>Mangas by {author.name}</h3>) : ''}

        <MangaList
          mangas={this.state.mangas}
          filterText={this.state.filterText}
          author={this.props.author}
          onMangaClick={this.handleMangaClick}
        />
      </div>
    );
  }
}
