import React, { PureComponent } from 'react';
import TextList from '../molecules/TextList';

export default class MangaList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextList
        displayAttribute='title'
        items={this.props.items}
        onItemClick={this.props.onItemClick}
      />
    );
  }
}
