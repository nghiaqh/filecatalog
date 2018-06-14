import React, { Component } from 'react';

export default class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let uri = this.props.page.uri;
    uri = uri.replace('/mnt/d', 'http://localhost/img');

    return (
      <div>
        <h3>image {this.props.page.title}</h3>
        <img src={uri}/>
      </div>
    );
  }
}
