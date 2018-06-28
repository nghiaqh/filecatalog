import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import MangaBoard from './components/templates/MangaBoard';
import MangasHub from './components/templates/MangasHub';
import Manga from './components/templates/Manga';
import { hot } from 'react-hot-loader';

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

  .text-center {
    text-align: center;
  }
`

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav>
          <Link to='/'>Dashboard</Link>{' '}
          <Link to='/mangas'>Mangas</Link>{' '}
        </nav>
        <Switch>
          <Route exact path='/' component={MangaBoard}/>
          <Route exact path='/mangas' component={MangasHub}/>
          <Route exact path='/mangas/:mangaId' component={Manga}/>
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);
