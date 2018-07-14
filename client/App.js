import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import styled from 'react-emotion';
import { hot } from 'react-hot-loader';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle
} from 'rmwc/TopAppBar';
import '../node_modules/material-components-web/dist/material-components-web.min.css';
import NavigationDrawer from './components/organisms/NavigationDrawer';
import { MangaHub } from './components/templates/MangaHub';
import { MangaDetail } from './components/templates/MangaDetail';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persistentOpen: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  render() {
    return (
      <section>

        <TopAppBar fixed>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <TopAppBarNavigationIcon use="menu" onClick={this.toggleDrawer}/>
              <TopAppBarTitle>
                <NavLink to="/" exact>Manga Catalog</NavLink>
              </TopAppBarTitle>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>

        <FlexContainer>
          <NavigationDrawer persistentOpen={this.state.persistentOpen}/>

          <Switch>
            <Route exact path='/' component={MangaHub}/>
            <Route exact path='/mangas' component={MangaHub}/>
            <Route exact path='/mangas/:mangaId' component={MangaDetail}/>
          </Switch>
        </FlexContainer>
      </section>
    );
  }

  toggleDrawer(e) {
    e.preventDefault();
    this.setState(prevState => ({
      persistentOpen: !prevState.persistentOpen
    }));
  }
}

export default hot(module)(App);

const FlexContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding-top: 64px;
  height: 100vh;
`;

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    margin: 0;
    color: var(--mdc-theme-on-primary);
  }

  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
  }

  :root {
    --mdc-theme-primary: #fedbd0;
    --mdc-theme-secondary: #feeae6;
    --mdc-theme-background: #caa99f;
    --mdc-theme-surface: #feeae6;
    --mdc-theme-on-primary: #442c2e;
    --mdc-theme-on-secondary: #442c2e;
    --mdc-theme-on-surface: #442c2e;
    --mdc-theme-text-primary-on-background: #442c2e;
    --mdc-theme-text-secondary-on-background: ##442c2e;
    --mdc-theme-text-hint-on-background: rgba(0,0,0,.38);
    --mdc-theme-text-disabled-on-background: rgba(0,0,0,.38);
    --mdc-theme-text-icon-on-background: #442c2e;
    --mdc-theme-text-primary-on-light: rgba(0,0,0,.87);
    --mdc-theme-text-secondary-on-light: rgba(0,0,0,.54);
    --mdc-theme-text-hint-on-light: rgba(0,0,0,.38);
    --mdc-theme-text-disabled-on-light: rgba(0,0,0,.38);
    --mdc-theme-text-icon-on-light: rgba(0,0,0,.38);
    --mdc-theme-text-primary-on-dark: #fff;
    --mdc-theme-text-secondary-on-dark: hsla(0,0%,100%,.7);
    --mdc-theme-text-hint-on-dark: hsla(0,0%,100%,.5);
    --mdc-theme-text-disabled-on-dark: hsla(0,0%,100%,.5);
    --mdc-theme-text-icon-on-dark: hsla(0,0%,100%,.5);
  }

  a {
    color: var(--mdc-theme-on-primary);
    text-decoration: none;
  }

  .mdc-button:not(:disabled) {
    color: var(--mdc-theme-on-primary);
    font-weight: 600;
  }

  :not(.mdc-list--non-interactive)>.mdc-list-item:after,
  :not(.mdc-list--non-interactive)>.mdc-list-item:before,
  .mdc-ripple-surface:after,
  .mdc-ripple-surface:before {
    background-color: var(--mdc-theme-secondary);
  }

  :not(.mdc-list--non-interactive)>.mdc-list-item:hover:before,
  .mdc-ripple-surface:hover:before {
    opacity: 0.4;
  }
`
