import React, { Component } from 'react';
import TextList from './TextList';
import hasClickableItems from './hasClickableItems';

const ClickableTextList = hasClickableItems(TextList);

export default class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: -1
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleArrowKey = this.handleArrowKey.bind(this);
  }

  // Overwrite handleClick of ClickableTextList to add key listener
  handleClick(e) {
    e.preventDefault();
    const i = parseInt(e._targetInst.key);
    const item = this.props.items[i];
    this.props.onItemClick(item);
    this.setState({currentPage: i});
    document.addEventListener('keydown', this.handleArrowKey);
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
      // check pagespanel to see if there is prev pagination
    }

    if (e.keyCode === 39 && i === items.length) {
      // check pagespanel to see if there is next pagination
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleArrowKey);
  }

  render() {
    return (
      <ClickableTextList
        displayAttribute='title'
        handleClick={this.handleClick}
        {...this.props}
      />
    );
  }
}
