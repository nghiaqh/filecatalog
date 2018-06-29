import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from 'rmwc/Card';
import { isNewItem } from '../DataHelpers';
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';

const StyledCard = styled(Card)`
  .manga-title {
    margin-bottom: 0;
    font-weight: 600;
  }
  .tag-groups {
    position: fixed;
    bottom: 73px;
    padding: 5px;
    background: #ffffff1a;
    width: 100%;
  }
`;

export default class Manga extends PureComponent {
  constructor(props) {
    super(props);
    this.viewManga = this.viewManga.bind(this);
  }

  viewManga(e) {
    this.props.onItemClick(this.props.manga);
  }

  render() {
    const { title, author, created } = this.props.manga;
    const isNew = isNewItem(this.props.manga);

    return (
      <StyledCard>
        <CardPrimaryAction onClick={this.viewManga}>
          <CardMedia
            sixteenByNine
            style={{
              backgroundImage:
                'url(https://material-components-web.appspot.com/images/16-9.jpg)'
            }}
          />
          {isNew ?
            <div className="tag-groups">
              <Icon use="fiber_new" />
            </div>
          : ''}
          <div style={{ padding: '0 1rem 1rem' }}>
            <Typography className="manga-title ellipsis" use="subtitle1" tag="h3">{title}</Typography>
            <Typography use="subtitle2">{author.name}</Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
            <CardAction onClick={this.viewManga}>Read</CardAction>
          </CardActionButtons>
          <CardActionIcons>
            <CardAction
              iconToggle
              on={{ label: 'Remove from favorites', content: 'favorite' }}
              off={{ label: 'Add to favorites', content: 'favorite_border' }}
            />
            <CardAction icon use="more_vert" />
          </CardActionIcons>
        </CardActions>
      </StyledCard>
    );
  }
}
