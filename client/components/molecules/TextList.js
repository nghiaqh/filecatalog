import React, { PureComponent } from 'react';
import styled from 'react-emotion';

const UL = styled('ul')`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  li {
    cursor: pointer;
    padding: 5px;

    &:hover {
      background: #5bacdf;
      color: #fcfefc;
    }
  }
`

export default class TextList extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const i = parseInt(e._targetInst.key);
    const item = this.props.items[i];
    this.props.onItemClick(item);
  }

  render() {
    const items = [];
    this.props.items.forEach((item, index) => {
      items.push(
        <li key={index} onClick={this.handleClick}>
          {item[this.props.displayAttribute]}
        </li>
      );
    });

    return (
      <UL>
        {items}
      </UL>
    );
  }
}
