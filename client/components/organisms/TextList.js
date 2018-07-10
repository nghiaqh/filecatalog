import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { List, SimpleListItem } from 'rmwc/List';
import { getNestedObject, isNewItem } from '../DataHelpers';

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
    const list = [];
    const { items, displayTextFrom, displaySecondaryFrom } = this.props;

    items.forEach((item, index) => {
      const text = item[displayTextFrom];
      const secondaryText = getNestedObject(item, displaySecondaryFrom);
      const meta = isNewItem(item) ? 'fiber_new' : null;
      list.push(
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
      <List>
        {list}
      </List>
    );
  }
}
