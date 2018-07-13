import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { injectGlobal } from 'emotion';
// import MangaBoard from './components/templates/MangaBoard';
// import MangasHub from './components/templates/MangasHub';
import Manga from './components/templates/Manga';
import { MangaList } from './components/organisms/MangaList/index';
import { hot } from 'react-hot-loader';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle
} from 'rmwc/TopAppBar';
import '../node_modules/material-components-web/dist/material-components-web.min.css';

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    margin: 0;
  }

  body {
    padding-top: 64px;
  }

  .mdc-top-app-bar {
    top: 0;
    a {
      color: #dadada;
      text-decoration: none;
      &:hover, &.active {
        color: #fff;
      }
    }
  }

  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
  }
`

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <NavLink to="/" exact>
                <TopAppBarNavigationIcon use="collections" />
              </NavLink>
              <TopAppBarTitle>
                <NavLink to="/mangas">Mangas</NavLink>
              </TopAppBarTitle>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <Switch>
          <Route exact path='/' component={MangaList}/>
          <Route exact path='/mangas' component={MangaList}/>
          <Route exact path='/mangas/:mangaId' component={Manga}/>
        </Switch>
      </section>
    );
  }
}

export default hot(module)(App);
