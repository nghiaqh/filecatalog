import React, { PureComponent } from 'react';
import styled from 'react-emotion';

export default class ContentGrid extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, colWidths } = this.props;
    const cws = Object.assign({
      phone: '100px',
      tablet: '150px',
      desktop: '200px'
    }, colWidths);

    const list = items.map((item) => (
      <div key={item.id} className='grid-item'>
        {this.props.render(item)}
      </div>
    ));

    return (
      <Grid id={this.props.id} cws={cws}>
        {list}
      </Grid>
    );
  }
}

const breakpoints = [768, 1200];
const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
);
const Grid = styled('div')(props => ({
  display: 'grid',
  gridGap: '10px',
  gridTemplateRows: 'auto',
  gridTemplateColumns: `repeat(auto-fit, minmax(${props.cws.phone}, 1fr))`,
  padding: '10px',

  [mq[0]]: {
    gridTemplateColumns: `repeat(auto-fit, minmax(${props.cws.tablet}, 1fr))`,
  },
  [mq[1]]: {
    gridTemplateColumns: `repeat(auto-fit, minmax(${props.cws.desktop}, 1fr))`,
  }
}));
