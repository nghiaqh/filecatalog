import React, { Component } from 'react';

export default class TextList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = [];
    this.props.items.forEach((item, index) => {
      items.push(
        <li key={index} onClick={this.props.handleClick}>
          {item[this.props.displayAttribute]}
        </li>
      );
    });

    return (
      <div>
        <ul>{items}</ul>
      </div>
    );
  }
}
