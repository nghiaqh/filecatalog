import React, { PureComponent } from 'react';

export default class TextList extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const i = parseInt(e._targetInst.return.key);
    const item = this.props.items[i];
    this.props.onItemClick(item);
  }

  render() {
    const items = [];
    this.props.items.forEach((item, index) => {
      items.push(
        <li key={index}>
          <div onClick={this.handleClick}>
            {item[this.props.displayAttribute]}
          </div>
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
