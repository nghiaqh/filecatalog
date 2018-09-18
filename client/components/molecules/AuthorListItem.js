import React, { PureComponent } from 'react';
import { SimpleListItem } from '@rmwc/list';
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
      <NavLink to={authorUrl}
        color='textPrimaryOnBackground'
        bgColor='background'>
        <SimpleListItem
          graphic='portrait'
          text={name}
          secondaryText={secondaryText}
        />
      </NavLink>
    );
  }
}
