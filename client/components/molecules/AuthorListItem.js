import React, { PureComponent } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText
} from '@rmwc/list';
import LazyLoad from 'react-lazyload';
import NavLink from '@atom/NavLink';
import Picture from '@atom/Picture';
import Avatar from '@atom/Avatar';

export default class AuthorListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, id, mangasCount, coverPicture, gender } = this.props.author;
    const authorUrl = `/authors/${id}`;
    const secondaryText = `${mangasCount} ${mangasCount > 1 ? 'mangas' : 'manga'}`
    const coverPicUrl = `${encodeURI(coverPicture)}`;
    const avatarStyle = {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      marginRight: '10px',
      border: '1px solid #b7bbb7',
      overflow: 'hidden'
    };

    return (
      <LazyLoad once={true} height='100%'>
        <NavLink to={authorUrl}
          color='textPrimaryOnBackground'
          bgColor='background'>
          <ListItem>
            <span style={avatarStyle}>
            {coverPicture
              ? <Picture src={coverPicUrl} title={name} />
              : <Avatar seed={name} collection={gender} /> }
            </span>
            <ListItemText>
              <ListItemPrimaryText>{name}</ListItemPrimaryText>
              <ListItemSecondaryText>{mangasCount ? secondaryText : ''}</ListItemSecondaryText>
            </ListItemText>
          </ListItem>
        </NavLink>
      </LazyLoad>
    );
  }
}
