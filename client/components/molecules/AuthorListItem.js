import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { SimpleListItem } from 'rmwc/List';

export default class AuthorListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onItemClick(this.props.author);
  }

  render() {
    const { name } = this.props.author;
    return (
      <StyledSimpleListItem
        graphic="portrait"
        onClick={this.handleClick}
        text={name}
      />
    );
  }
}

const StyledSimpleListItem = styled(SimpleListItem)`
  cursor: pointer;
`;
