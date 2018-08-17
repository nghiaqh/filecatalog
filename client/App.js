import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import styled from 'react-emotion';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { ThemeProvider } from 'rmwc/Theme';
import NavigationDrawer from './components/organisms/NavigationDrawer';
import { AuthorHub } from './components/templates/AuthorHub';
import { AuthorDetail } from './components/templates/AuthorDetail';
import { MangaHub } from './components/templates/MangaHub';
import { MangaDetail } from './components/templates/MangaDetail';
import { TopAppBar, setBreadcrumb } from './components/organisms/TopAppBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawOpen: false
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }
  render() {
    return (
      <ThemeProvider options={this.props.theme}>
        <TopAppBar onClickMenuIcon={this.openDrawer} />

        <FlexContainer>
          <NavigationDrawer
            open={this.state.drawOpen}
            onClose={this.closeDrawer}
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

  componentDidMount() {
    const { dispatch, history, location } = this.props;
    dispatch(setBreadcrumb(location.pathname));
    this.unlisten = history.listen((location, action) =>
      dispatch(setBreadcrumb(location.pathname))
    );
  }

  componentWillUnmount() {
    this.unlisten();
  }

  openDrawer(e) {
    e.preventDefault();
    this.setState({ drawOpen: true });
  }

  closeDrawer(e) {
    this.setState({ drawOpen: false });
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
  hot(module)(App)
));
