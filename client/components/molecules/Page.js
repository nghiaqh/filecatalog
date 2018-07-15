import React, { PureComponent } from 'react';
import styled from 'react-emotion';

const Image = styled('img')`
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  display: block;
  margin: 0 auto;
  cursor: pointer;
`

export default class Page extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const uri = this.props.page.uri;
    const tooltip = 'Double click the image to view in fullscsreen. Use left,\
 right arrow keys to navigate';

    return (
      <div>
        <Image
          id={this.props.id}
          className={this.props.className}
          src={uri}
          title={tooltip}
          onTouchStart={this.props.onTouchStart}
          onTouchEnd={this.props.onTouchEnd}
          onClick={this.props.onClick}
          />
      </div>
    );
  }
}
