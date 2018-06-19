import React, { PureComponent } from 'react';
import styled from 'react-emotion';

const Image = styled('img')`
  width: auto;
  max-width: 100%;
  display: block;
  margin: 0 auto;
`

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
        <Image src={uri}/>
      </div>
    );
  }
}
