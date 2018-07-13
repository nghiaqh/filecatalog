import React, { PureComponent } from 'react';
import styled from 'react-emotion';

const StyledGrid = styled('section')`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 10px 0;
`;

export default class ContentGrid extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const list = [];
    const { items } = this.props;

    items.forEach((item, index) => {
      list.push(
        this.props.render(item, ...this.props)
      );
    });

    return (
      <StyledGrid>
        {list}
        <div className='phantom-child'></div>
      </StyledGrid>
    );
  }
}