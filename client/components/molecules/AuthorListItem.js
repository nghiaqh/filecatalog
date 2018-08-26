import React, { PureComponent } from 'react';
import { SimpleListItem } from 'rmwc/List';
import NavLink from '../atoms/NavLink';

export default class AuthorListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, id } = this.props.author;
    const authorUrl = `/authors/${id}`;

    return (
      <NavLink to={authorUrl} bgColor='background'>
        <SimpleListItem
          graphic='portrait'
          onClick={this.handleClick}
          text={name}
        />
      </NavLink>
    );
  }
}
