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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.toggleFullscreen(e.target);
    if (e.target.requestFullscreen) {
      e.target.requestFullscreen();
    } else if (e.target.webkitRequestFullscreen) {
      e.target.webkitRequestFullscreen();
    }
  }

  toggleFullscreen(element) {
    const fsPrefixes = [
      'fullscreenEnabled',
      'webkitFullscreenEnabled',
      'mozFullscreenEnabled',
      'msFullscreenEnabled'
    ];
    const fePrefixes = [
      'fullscreenElement',
      'webkitFullscreenElement',
      'mozFullScreenElement',
      'msFullscreenElement'
    ];
    const efPrefixes = [
      'exitFullscreen',
      'webkitExitFullscreen',
      'mozCancelFullScreen',
      'msExitFullscreen'
    ];

    const fs = fsPrefixes.filter(fs => element[fs]);
    const fe = fePrefixes.filter(fe => element[fe]);
    const ef = efPrefixes.filter(ef => document[ef]);

    if (element[fs] && !element[fe]) {
      element[fe]();
    } else if (document[ef]) {
      document[ef]();
    }
  }

  render() {
    const uri = this.props.page.uri;
    const tooltip = 'Double click the image to view in fullscsreen. Use left,\
 right arrow keys to navigate';

    return (
      <div>
        <Image
          className={this.props.className}
          src={uri}
          title={tooltip}
          onDoubleClick={this.handleClick}
          onTouchStart={this.props.onTouchStart}
          onTouchEnd={this.props.onTouchEnd}
          onClick={this.props.onClick}
          />
      </div>
    );
  }
}
