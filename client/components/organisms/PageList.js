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
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
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
        gestureZone.addEventListener('touchstart', _this.handleTouchStart, false);
        gestureZone.addEventListener('touchend', _this.handleTouchEnd, false);
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

  handleTouchStart(e) {
    this.touchstartX = e.changedTouches[0].screenX;
  }

  handleTouchEnd(e) {
    this.touchendX = e.changedTouches[0].screenX;
    this.handleGesture(e);
  }

  handleGesture(e) {
    let i = this.state.currentPage;
    const items = this.props.items
    const pageWidth = window.innerWidth || document.body.clientWidth;
    let x = this.touchendX - this.touchstartX;
    if (x < -40 || this.touchendX > 2 * pageWidth / 3) {
      console.log("left");
      if (i + 1 < items.length) {
        this.props.onItemClick(items[i + 1]);
        this.setState({currentPage: i + 1});
      } else if (i + 1 === items.length) {
        this.props.loadNextList()
          .then(() => this.onItemClick(this.props.items[0]))
          .catch((e) => console.log(e));
      }
    } else if (x > 40 || this.touchendX < pageWidth / 3) {
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
    gestureZone.removeEventListener('touchstart', this.handleTouchStart);
    gestureZone.removeEventListener('touchend', this.handleTouchEnd);
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
