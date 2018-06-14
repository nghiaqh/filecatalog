import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleArrowKey = this.handleArrowKey.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const pages = this.props.pages;
    const i = parseInt(e.target.getAttribute('page-index'));
    const page = pages[i];
    this.props.onPageClick(page);
    this.setState({currentPage: i});

    document.addEventListener('keydown', this.handleArrowKey);
  }

  handleArrowKey(e) {
    let i = this.state.currentPage;
    const pages = this.props.pages
    // left arrow || right arrow
    if ((e.keyCode === 37 && --i >= 0) ||
       (e.keyCode === 39 && ++i < pages.length)) {
      e.preventDefault();
      this.props.onPageClick(pages[i]);
      this.setState({currentPage: i});
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleArrowKey);
  }

  render() {
    const pages = [];
    this.props.pages.forEach((page, index) => {
      pages.push(
        <li key={index}>
          <a page-index={index} onClick={this.handleClick}>
            {page.title}
          </a>
        </li>
      );
    });

    return (
      <div>
        <ul>{pages}</ul>
      </div>
    );
  }
}
