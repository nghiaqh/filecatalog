import React, { PureComponent } from 'react';
import TextList from '../molecules/TextList';

export default class PageList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: -1
    }
    this.onItemClick = this.onItemClick.bind(this);
    this.handleArrowKey = this.handleArrowKey.bind(this);
    this.handleGesture = this.handleGesture.bind(this);
  }

  onItemClick(item) {
    const i = this.props.items.indexOf(item);
    this.setState({currentPage: i});
    this.props.onItemClick(item);

    // support page load by arrow key
    document.addEventListener('keydown', this.handleArrowKey);

    // support page load by swipe/tap
    const _this = this;
    setTimeout(function() {
      const gestureZone = document.getElementById('imageViewer');

      if (gestureZone) {
        let pageWidth = window.innerWidth || document.body.clientWidth;
        let treshold = Math.max(1,Math.floor(0.01 * (pageWidth)));
        let touchstartX = 0;
        let touchendX = 0;
        let eventTimeout;

        gestureZone.addEventListener('touchstart', function(event) {
          touchstartX = event.changedTouches[0].screenX;
        }, false);

        gestureZone.addEventListener('touchend', function(event) {
          if ( !eventTimeout ) {
            eventTimeout = setTimeout(function() {
              eventTimeout = null;
              touchendX = event.changedTouches[0].screenX;
              _this.handleGesture(event, touchstartX, touchendX, treshold, pageWidth);
            }, 80);
          }
        }, false);
      }
    }, 500);
  }

  handleArrowKey(e) {
    let i = this.state.currentPage;
    const items = this.props.items
    // left arrow || right arrow
    if ((e.keyCode === 37 && --i >= 0) ||
       (e.keyCode === 39 && ++i < items.length)) {
      e.preventDefault();
      this.props.onItemClick(items[i]);
      this.setState({currentPage: i});
    }

    if (e.keyCode === 37 && i < 0) {
      // check HasPagination to see if there is prev pagination
      this.props.loadPrevList()
        .then(() => this.onItemClick(this.props.items[this.props.items.length - 1]))
        .catch((e) => console.log(e));
    }

    if (e.keyCode === 39 && i === items.length) {
      // check HasPagination to see if there is next pagination
      this.props.loadNextList()
        .then(() => this.onItemClick(this.props.items[0]))
        .catch((e) => console.log(e));
    }
  }

  handleGesture(e, touchstartX, touchendX, pageWidth) {
    let i = this.state.currentPage;
    const items = this.props.items

    let x = touchendX - touchstartX;
    if (x < 0 || touchendX > pageWidth / 2) {
      console.log("left");
      if (i + 1 < items.length) {
        this.props.onItemClick(items[i + 1]);
        this.setState({currentPage: i + 1});
      } else if (i + 1 === items.length) {
        this.props.loadNextList()
          .then(() => this.onItemClick(this.props.items[0]))
          .catch((e) => console.log(e));
      }
    } else {
      console.log("right");
      if (i - 1 >= 0) {
        this.props.onItemClick(items[i - 1]);
        this.setState({currentPage: i - 1});
      } else if (i - 1 < 0) {
        this.props.loadPrevList()
          .then(() => this.onItemClick(this.props.items[this.props.items.length - 1]))
          .catch((e) => console.log(e));
      }
    }
}

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleArrowKey);
    const gestureZone = document.getElementById('imageViewer');
    gestureZone.removeEventListener('touchstart');
    gestureZone.removeEventListener('touchend');
  }

  render() {
    return (
      <TextList
        displayAttribute='title'
        items={this.props.items}
        onItemClick={this.onItemClick}
      />
    );
  }
}
