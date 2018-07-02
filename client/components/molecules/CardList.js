import React, { PureComponent } from 'react';
import styled from 'react-emotion';

const StyledCardCollection = styled('section')`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 10px 0;

  .mdc-card {
    flex: auto;
    height: auto;
    margin: 8px 1% 8px 0;
    width: 98%;

    @media (min-width: 468px) {
      flex-basis: 49%;
      max-width: 49%;
    }
    @media (min-width: 1024px) {
      flex-basis: 24%;
      max-width: 24%;
    }
    @media (min-width: 1280px) {
      flex-basis: 250px;
      max-width: 250px;
      margin: 8px 10px 8px 0;
    }
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
