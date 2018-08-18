import React, { PureComponent } from 'react';
import styled from 'react-emotion';

const StyledGrid = styled('section')`
  display: flex;
  flex-flow: row wrap;
`;

export default class ContentGrid extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const list = [];
    const { items } = this.props;

    items.forEach((item) => {
      list.push(
        this.props.render(item)
      );
    });

    return (
      <StyledGrid id={this.props.id}>
        {list}
      </StyledGrid>
    );
  }
}
