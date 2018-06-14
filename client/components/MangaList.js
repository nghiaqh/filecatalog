import React, { Component } from 'react';
import TextList from './TextList';
import hasClickableItems from './hasClickableItems';

const ClickableTextList = hasClickableItems(TextList);

export default class MangaList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ClickableTextList
        displayAttribute='title'
        {...this.props}
      />
    );
  }
}
