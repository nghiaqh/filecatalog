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
  }

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

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleArrowKey);
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
