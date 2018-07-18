import React, { PureComponent } from 'react';
import styled from 'react-emotion';

export default class Page extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, uri, number } = this.props.page;

    return (
      <Image
        id={this.props.id}
        className={this.props.className}
        src={uri}
        title={`Page ${number}`}
        onTouchStart={this.props.onTouchStart}
        onTouchEnd={this.props.onTouchEnd}
        onClick={this.props.onClick}
      />
    );
  }
}

const Image = styled('img')`
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  object-fit: contain;
`;
