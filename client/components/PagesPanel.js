import React, { Component } from 'react';
import PageList from './PageList';

export default class PagesPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: []
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(page) {
    this.props.onPageSelect(page);
  }

  componentDidUpdate() {
    const manga = this.props.manga;
    if (manga) {
      fetch(`/api/Pages?filter=%7B"where"%3A%7B"mangaId"%3A${manga.id}%7D%7D`)
        .then(res => res.json())
        .then(pages => this.setState({ pages: pages }));
    }
  }

  render() {
    const manga = this.props.manga;

    return (
      <div>
        <h2>{this.constructor.name}</h2>

        {manga ? (<h3>{manga.title}</h3>) : ''}

        <PageList
          pages={this.state.pages}
          onPageClick={this.handlePageClick}
        />
      </div>
    );
  }
}
