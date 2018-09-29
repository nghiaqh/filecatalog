import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from '@rmwc/theme';
import NavigationDrawer from '@organism/NavigationDrawer';
import { AuthorHub } from '@template/AuthorHub';
import { AuthorDetail } from '@template/AuthorDetail';
import { MangaHub } from '@template/MangaHub';
import { MangaDetail, MangaEdit } from '@template/MangaDetail';
import { PageViewer } from '@template/PageViewer';
import { TopAppBar, setBreadcrumb } from '@organism/TopAppBar';
import '@client/Style';

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
    const { theme, location } = this.props;

    return (
      <ThemeProvider options={theme}>
        <TopAppBar onClickMenuIcon={this.openDrawer} compact/>

        <React.Fragment>
          <NavigationDrawer
            open={this.state.drawOpen}
            onClose={this.closeDrawer}
            theme={theme}
            location={location}
          />

          <Switch>
            <Route exact path='/' component={MangaHub}/>
            <Route exact path='/mangas' component={MangaHub}/>
            <Route exact path='/mangas/:mangaId' component={MangaDetail}/>
            <Route exact path='/mangas/:mangaId/edit' component={MangaEdit}/>
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
