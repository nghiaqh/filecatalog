import React, { PureComponent } from 'react';
import TextList from './TextList';
import hasClickableItems from './hasClickableItems';

const ClickableTextList = hasClickableItems(TextList);

export default class AuthorList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ClickableTextList
        displayAttribute='name'
        items={this.props.items}
        onItemClick={this.props.onItemClick}
      />
    );
  }
}
