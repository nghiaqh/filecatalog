import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import MangaBoard from './components/templates/MangaBoard';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav>
          <Link to='/'>Manga Dashboard</Link>{' '}
        </nav>
        <Switch>
          <Route exact path='/' component={MangaBoard}/>
        </Switch>
      </div>
    );
  }
}
