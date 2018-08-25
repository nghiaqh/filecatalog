import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { ThemeProvider } from 'rmwc/Theme';
import NavigationDrawer from './components/organisms/NavigationDrawer';
import { AuthorHub } from './components/templates/AuthorHub';
import { AuthorDetail } from './components/templates/AuthorDetail';
import { MangaHub } from './components/templates/MangaHub';
import { MangaDetail } from './components/templates/MangaDetail';
import { PageViewer } from './components/templates/PageViewer';
import { TopAppBar, setBreadcrumb } from './components/organisms/TopAppBar';
import './Style';

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

        <React.Fragment>
          <NavigationDrawer
            open={this.state.drawOpen}
            onClose={this.closeDrawer}
          />

          <Switch>
            <Route exact path='/' component={MangaHub}/>
            <Route exact path='/mangas' component={MangaHub}/>
            <Route exact path='/mangas/:mangaId' component={MangaDetail}/>
            <Route exact path='/mangas/:mangaId/:pageNumber' component={PageViewer}/>
            <Route exact path='/authors' component={AuthorHub}/>
            <Route exact path='/authors/:authorId' component={AuthorDetail}/>
          </Switch>
        </React.Fragment>
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
