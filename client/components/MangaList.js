import React, { PureComponent } from 'react';
import TextList from './TextList';
import hasClickableItems from './hasClickableItems';

const ClickableTextList = hasClickableItems(TextList);

export default class MangaList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ClickableTextList
        displayAttribute='title'
        items={this.props.items}
        onItemClick={this.props.onItemClick}
      />
    );
  }
}
