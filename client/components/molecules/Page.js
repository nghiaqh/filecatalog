import React, { PureComponent } from 'react';

export default class Page extends PureComponent {
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
