import React, { Component } from 'react';
import { Route, NavLink, Switch, withRouter } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import styled from 'react-emotion';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle,
  TopAppBarFixedAdjust
} from 'rmwc/TopAppBar';
import { ThemeProvider } from 'rmwc/Theme';
import '../node_modules/material-components-web/dist/material-components-web.min.css';
import NavigationDrawer from './components/organisms/NavigationDrawer';
import { AuthorHub } from './components/templates/AuthorHub';
import { AuthorDetail } from './components/templates/AuthorDetail';
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
      <ThemeProvider options={this.props.theme}>
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
        <TopAppBarFixedAdjust/>

        <FlexContainer>
          <NavigationDrawer
            persistentOpen={this.state.persistentOpen}
          />

          <Switch>
            <Route exact path='/' component={MangaHub}/>
            <Route exact path='/mangas' component={MangaHub}/>
            <Route exact path='/mangas/:mangaId' component={MangaDetail}/>
            <Route exact path='/authors' component={AuthorHub}/>
            <Route exact path='/authors/:authorId' component={AuthorDetail}/>
          </Switch>
        </FlexContainer>
      </ThemeProvider>
    );
  }

  toggleDrawer(e) {
    e.preventDefault();
    this.setState(prevState => ({
      persistentOpen: !prevState.persistentOpen
    }));
  }
}

const FlexContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding-bottom: 10px;
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
    overflow-x: hidden;
  }

  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
  }

  a {
    text-decoration: none;
  }

  .mdc-top-app-bar a {
    color: var(--mdc-theme-on-primary);
  }

  .mdc-button:not(:disabled) {
    color: var(--mdc-theme-text-primary-on-background);
  }
`;

// container
const mapStateToProps = (state) => {
  const { themes, enabledTheme } = state;

  return {
    theme: themes[enabledTheme]
  };
};

export default withRouter(connect(mapStateToProps)(
  hot(module)(App))
);
