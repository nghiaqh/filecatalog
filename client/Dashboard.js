import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import AuthorList from './AuthorList';
import Manga from './Manga';
import Page from './Page';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: []
    };
  }

  componentDidMount() {
    fetch('/api/Authors')
      .then(res => res.json())
      .then(authors => this.setState({ authors: authors }));
  }

  render() {
    return (
      <div>
        <h1>dashboard</h1>
        <div>
          <AuthorList authors={this.state.authors}/>
          <Route
            path='/mangas/:mangaId'
            component={Manga}
          />
          <Route
            path='/pages/:pageId'
            component={Page}
          />
        </div>
      </div>
    );
  }
}
