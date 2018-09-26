import React, { PureComponent } from 'react';
import styled from 'react-emotion';

class Picture extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image {...this.props} />
    );
  }
}

const Image = styled('img')`
  display: block;
  margin: 0 auto;
  max-height: 100%;
  object-fit: cover;
`;

export default Picture;
