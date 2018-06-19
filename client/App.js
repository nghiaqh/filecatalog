import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import MangaBoard from './components/templates/MangaBoard';

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    -webkit-font-smoothing: antialiased;

    margin: 0;
    padding: 0;

    color: #1a1a1a;
  }

  button.no-border {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    outline: none;
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
