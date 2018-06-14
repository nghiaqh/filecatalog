import React, { Component } from 'react';
import TextList from './TextList';
import hasClickableItems from './hasClickableItems';

const ClickableTextList = hasClickableItems(TextList);

export default class AuthorList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ClickableTextList
        displayAttribute='name'
        {...this.props}
      />
    );
  }
}
