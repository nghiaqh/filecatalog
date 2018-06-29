import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { List, SimpleListItem } from 'rmwc/List';

const StyledSimpleListItem = styled(SimpleListItem)`
  cursor: pointer;
`

export default class TextList extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const i = parseInt(e.currentTarget.getAttribute('data-key'));
    const item = this.props.items[i];
    this.props.onItemClick(item);
  }

  render() {
    const items = [];
    this.props.items.forEach((item, index) => {
      const text = item[this.props.displayTextFrom];
      const secondaryText = getNestedObject(item, this.props.displaySecondaryFrom);
      const meta = isNewItem(item) ? 'fiber_new' : null;
      items.push(
        <StyledSimpleListItem
          key={index}
          onClick={this.handleClick}
          text={text}
          secondaryText={secondaryText}
          data-key={index}
          meta={meta}
        />
      );
    });

    return (
      <List {...this.props.twoLine ? twoLine : ''}>
        {items}
      </List>
    );
  }
}

function getNestedObject(nestedObj, path) {
  if (!Array.isArray(path)) return null;
  return path.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : undefined,
    nestedObj
  );
}

function isNewItem(item) {
  const now = new Date();
  const then = new Date(item.updated);
  return (now - then) / (1000 * 3600 * 24) <= 10;
}
