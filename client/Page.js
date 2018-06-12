import React, { Component } from 'react';

export default class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const id = this.props.match.params.pageId;
    let uri = this.props.location.state.page.uri;
    uri = uri.replace('/mnt/d', 'http://localhost/img');

    return (
      <div>
        <h1>image {this.props.location.state.page.title}</h1>
        <img src={uri}/>
      </div>
    );
  }
}
