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
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
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
    let uri = this.props.page.uri;
    uri = uri.replace('/mnt/d', 'http://192.168.0.6/img');

    return (
      <div>
        <h3>image {this.props.page.title}</h3>
        <Image id="imageViewer" src={uri} onDoubleClick={this.handleClick}
          title="Click to view in fullscsreen. Use left, right arrow for navigation" />
      </div>
    );
  }
}
