import React, { PureComponent } from 'react';
import styled from 'react-emotion';

class Picture extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, src, alt, title } = this.props;

    return (
      <Image
        className={className}
        src={src}
        alt={alt}
        title={title}
      />
    );
  }
}

const Image = styled('img')`
  display: block;
  margin: 0 auto;
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
`;

export default Picture;
