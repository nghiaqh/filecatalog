import React, { PureComponent } from 'react';
import { List } from 'rmwc/List';
import { Typography } from 'rmwc/Typography';

export default class ContentList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;
    if (!items || items.length === 0) {
      return this.renderNoContent();
    }

    const list = items.map(item => this.props.render(item));

    return (
      <List id={this.props.id}>
        {list}
      </List>
    );
  }

  renderNoContent() {
    return (
      <div className='text-center'>
        <br/><br/>
        <Typography use='headline1'>( ˚ Δ ˚ ) b</Typography>
        <br/><br/>
        <Typography use='body1'>No contents found!</Typography>
      </div>
    )
  }
}
