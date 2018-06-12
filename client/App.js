import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav>
          <Link to='/'>Dashboard</Link>
        </nav>
        <Switch>
          <Route path='/' component={Dashboard}/>
        </Switch>
      </div>
    );
  }
}
