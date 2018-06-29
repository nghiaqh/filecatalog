import React, { PureComponent } from 'react';
import styled from 'react-emotion';

const StyledCardCollection = styled('section')`
  display: flex;
  flex-flow: row wrap;
  padding: 10px;

  .mdc-card {
    flex: auto;
    height: auto;
    flex-basis: 25%;
    min-width: 250px;
    margin: 8px;
  }
`;

export default class CardList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const list = [];
    const { items } = this.props;

    items.forEach((item, index) => {
      list.push(
        this.props.render(item, index, this.props.onItemClick, ...this.props)
      );
    });

    return (
      <StyledCardCollection>
        {list}
      </StyledCardCollection>
    );
  }
}
