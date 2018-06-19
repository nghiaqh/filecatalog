import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import Page from '../molecules/Page';

export default class PagePanel extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const page = this.props.page;
    return (
      <section>
        { page ? (<Page page={this.props.page} />) : ''}
      </section>
    );
  }
}
