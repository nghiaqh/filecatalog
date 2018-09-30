import React, { PureComponent } from 'react';
import Picture from '@atom/Picture';
import Avatar from '@atom/Avatar';
import ListItem from '@molecule/ListItem';

export default class AuthorListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, id, mangasCount, coverPicture, gender } = this.props.author;
    const url = `/authors/${id}`;
    const secondaryText = !mangasCount ? ''
      : `${mangasCount} ${mangasCount > 1 ? 'mangas' : 'manga'}`;
    const coverPicUrl = `${encodeURI(coverPicture)}`;
    const avatar = coverPicture
      ? <Picture src={coverPicUrl} title={name} />
      : <Avatar seed={name} collection={gender} />;

    return (
      <ListItem
        url={url}
        avatar={avatar}
        primaryText={name}
        secondaryText={secondaryText}/>
    );
  }
}
