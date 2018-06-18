import React, { PureComponent } from 'react';
import Page from '../molecules/Page';

export default class PagePanel extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const page = this.props.page;
    return (
      <div>
        { page ? (<Page page={this.props.page} />) : ''}
      </div>
    );
  }
}
