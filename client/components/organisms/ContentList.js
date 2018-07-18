import React, { PureComponent } from 'react';
import { List } from 'rmwc/List';

export default class ContentList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const list = [];
    const { items } = this.props;

    items.forEach((item) => {
      list.push(
        this.props.render(item)
      );
    });

    return (
      <List id={this.props.id}>
        {list}
      </List>
    );
  }
}
