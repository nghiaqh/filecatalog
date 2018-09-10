import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { Typography } from '@rmwc/typography';

export default class ContentGrid extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, retrievingItems } = this.props;

    const cols = Object.assign({
      xsmall: 2,
      small: 4,
      medium: 6,
      large: 8,
      xlarge: 12
    }, this.props.cols);

    const filtered = items.filter(item => item && item.id);
    const list = filtered.map(item => (
      <div key={item.id} className='grid-item'>
        {this.props.render(item)}
      </div>
    ));

    const notFoundMessage = (list.length === 0 && !retrievingItems)
      ? this.renderNoContent()
      : '';

    return (
      <React.Fragment>
        <Grid id={this.props.id} {...cols}>
          {list}
        </Grid>
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

const breakpoints = [400, 641, 1008, 1921];
const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
);
const Grid = styled('div')(props => {
  const { xsmall, small, medium, large, xlarge } = props;
  return {
    display: 'grid',
    gridGap: '10px',
    gridTemplateRows: 'auto',
    gridTemplateColumns: `repeat(${xsmall}, calc((100% - 10px) / ${xsmall}))`,
    padding: '10px',

    [mq[0]]: {
      gridTemplateColumns: `repeat(${small}, calc((100% - 10px * (${small} - 1)) / ${small}))`,
    },
    [mq[1]]: {
      gridTemplateColumns: `repeat(${medium}, calc((100% - 10px * (${medium} - 1)) / ${medium}))`,
    },
    [mq[2]]: {
      gridTemplateColumns: `repeat(${large}, calc((100% - 10px * (${large} - 1)) / ${large}))`,
    },
    [mq[3]]: {
      gridTemplateColumns: `repeat(${xlarge}, calc((100% - 10px * (${xlarge} - 1)) / ${xlarge}))`,
    }
  };
});
