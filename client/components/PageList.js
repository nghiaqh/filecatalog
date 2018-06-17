import React, { PureComponent } from 'react';
import TextList from './TextList';
import hasClickableItems from './hasClickableItems';

const ClickableTextList = hasClickableItems(TextList);

export default class PageList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: -1
    }
    this.onItemClick = this.onItemClick.bind(this);
    this.handleArrowKey = this.handleArrowKey.bind(this);
  }

  // Overwrite onItemClick of ClickableTextList to add key listener
  onItemClick(item) {
    const i = this.props.items.indexOf(item);
    this.setState({currentPage: i});
    document.addEventListener('keydown', this.handleArrowKey);
    this.props.onItemClick(item);
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
      this.props.loadPrevList().then(() => {
        this.onItemClick(this.props.items[this.props.items.length - 1]);
      });
    }

    if (e.keyCode === 39 && i === items.length) {
      // check pagespanel to see if there is next pagination
      this.props.loadNextList().then(() => {
        this.onItemClick(this.props.items[0]);
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleArrowKey);
  }

  render() {
    return (
      <ClickableTextList
        displayAttribute='title'
        items={this.props.items}
        onItemClick={this.onItemClick}
      />
    );
  }
}
