import React, { PureComponent } from 'react';
import { List } from '@rmwc/list';
import { Typography } from '@rmwc/typography';

export default class ContentList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;

    const list = items.map(item => this.props.render(item));
    const notFoundMessage = list.length === 0 ? this.renderNoContent() : '';

    return (
      <React.Fragment>
        <List id={this.props.id} twoLine={this.props.twoLine}>
          {list}
        </List>
        {notFoundMessage}
      </React.Fragment>
    );
  }

  renderNoContent() {
    return (
      <div className='text-center'>
        <br/><br/>
        <Typography use='headline2'>( ˚ Δ ˚ ) b</Typography>
        <br/><br/>
        <Typography use='body1'>No contents found!</Typography>
      </div>
    )
  }
}
