import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import MangaBoard from './components/templates/MangaBoard';

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
  }
`

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
