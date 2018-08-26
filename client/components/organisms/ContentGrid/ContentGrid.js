import React, { PureComponent } from 'react';
import styled from 'react-emotion';

export default class ContentGrid extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;
    const cols = Object.assign({
      small: 2,
      medium: 6,
      large: 8,
      xlarge: 12
    }, this.props.cols);

    const list = items.map((item) => (
      <div key={item.id} className='grid-item'>
        {this.props.render(item)}
      </div>
    ));

    return (
      <Grid id={this.props.id} {...cols}>
        {list}
      </Grid>
    );
  }
}

const breakpoints = [641, 1008, 1921];
const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
);
const Grid = styled('div')(props => {
  const { small, medium, large, xlarge } = props;
  return {
    display: 'grid',
    gridGap: '10px',
    gridTemplateRows: 'auto',
    gridTemplateColumns: `repeat(${small}, calc((100% - 10px) / ${small}))`,
    padding: '10px',

    [mq[0]]: {
      gridTemplateColumns: `repeat(${medium}, calc((100% - 10px * (${medium} - 1)) / ${medium}))`,
    },
    [mq[1]]: {
      gridTemplateColumns: `repeat(${large}, calc((100% - 10px * (${large} - 1)) / ${large}))`,
    },
    [mq[2]]: {
      gridTemplateColumns: `repeat(${xlarge}, calc((100% - 10px * (${xlarge} - 1)) / ${xlarge}))`,
    }
  };
});
