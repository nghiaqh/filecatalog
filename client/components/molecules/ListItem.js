import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import {
  ListItem as RMWCListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText
} from '@rmwc/list';
import LazyLoad from 'react-lazyload';
import NavLink from '@atom/NavLink';

export default class ListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { url, avatar, picture, primaryText, secondaryText } = this.props;

    return (
      <LazyLoad once={true} height='100%'>
        <NavLink to={url} color='textPrimaryOnBackground' bgColor='background'>
          <StyledListItem>
            {avatar && <span className='list-item-avatar'>{avatar}</span>}
            {picture && <span className='list-item-pic'>{picture}</span>}
            <ListItemText>
              <ListItemPrimaryText>{primaryText}</ListItemPrimaryText>
              <ListItemSecondaryText>{secondaryText}</ListItemSecondaryText>
            </ListItemText>
          </StyledListItem>
        </NavLink>
      </LazyLoad>
    );
  }
}

const StyledListItem = styled(RMWCListItem)`
  .list-item-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #b7bbb7;
    overflow: hidden;
    margin-right: 10px;
    }

  .list-item-pic {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    border: 1px solid #b7bbb7;
    box-sizing: content-box;

    img {
      height: 60px;
      width: 60px;
      object-fit: cover;
    }
  }
`
