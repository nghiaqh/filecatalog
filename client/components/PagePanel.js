import React, { Component } from 'react';
import Page from './Page';

export default class PagePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const page = this.props.page;
    return (
      <div>
        <h2>{this.constructor.name}</h2>
        { page ? (<Page page={this.props.page} />) : ''}
      </div>
    );
  }
}
