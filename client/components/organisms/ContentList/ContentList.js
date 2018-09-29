import React, { PureComponent } from 'react';
import { List } from '@rmwc/list';
import NotFoundMessage from '@atom/NotFoundMessage';

export default class ContentList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, retrievingItems } = this.props;

    const list = items.map(item => this.props.render(item));
    const notFoundMessage = (list.length === 0 && !retrievingItems)
      ? (<NotFoundMessage />)
      : '';

    return (
      <React.Fragment>
        <List
          id={this.props.id}
          twoLine={this.props.twoLine}
        >
          {list}
        </List>
        {notFoundMessage}
      </React.Fragment>
    );
  }
}
