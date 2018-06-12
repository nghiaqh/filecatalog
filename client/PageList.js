import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Page from './Page';

export default class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: []
    };
  }

  componentDidMount() {
    fetch(`/api/Pages?filter=%7B"where"%3A%7B"mangaId"%3A${this.props.mangaId}%7D%7D`)
      .then(res => res.json())
      .then(pages => this.setState({ pages: pages }));
  }

  render() {
    const pages = [];
    this.state.pages.forEach((page, index) => {
      pages.push(
        <li key={index}>
          <Link to={{
            pathname: `/pages/${page.id}`,
            state: { page: page }
          }}>
            {page.title}
          </Link>
        </li>
      );
    });

    return (
      <div>
        <ul>{pages}</ul>
      </div>
    );
  }
}
