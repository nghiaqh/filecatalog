import React, { PureComponent } from 'react';
import { SimpleListItem } from 'rmwc/List';
import NavLink from '../atoms/NavLink';

export default class AuthorListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, id, mangasCount } = this.props.author;
    const authorUrl = `/authors/${id}`;
    const secondaryText = `${mangasCount} ${mangasCount > 1 ? 'mangas' : 'manga'}`

    return (
      <NavLink to={authorUrl} bgColor='background'>
        <SimpleListItem
          graphic='person'
          onClick={this.handleClick}
          text={name}
          secondaryText={secondaryText}
        />
      </NavLink>
    );
  }
}
