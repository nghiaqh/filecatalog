import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { Typography } from '@rmwc/typography';
import ReactSiema from 'react-siema';

export default class ContentSlider extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, retrievingItems } = this.props;

    const filtered = items.filter(item => item && item.id);
    const list = filtered.map(item => (
      <div key={item.id}>
        {this.props.render(item)}
      </div>
    ));

    const notFoundMessage = (list.length === 0 && !retrievingItems)
      ? this.renderNoContent()
      : '';

    return (
      <ReactSiema>
        {list}
        {notFoundMessage}
      </ReactSiema>
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
