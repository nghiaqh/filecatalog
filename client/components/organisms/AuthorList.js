import React, { PureComponent } from 'react';
import TextList from '../molecules/TextList';

export default class AuthorList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextList
        displayAttribute='name'
        items={this.props.items}
        onItemClick={this.props.onItemClick}
      />
    );
  }
}
