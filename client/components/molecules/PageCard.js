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
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';

const StyledCard = styled(Card)`
  width: calc(50% - 20px);
  max-width: 210px;
  margin: 10px 10px 0 0;

  .mdc-card__media {
    height: calc(50vw * 4 / 3);
    max-height: 280px;
    background-size: contain;
  }
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

export default class PageCard extends PureComponent {
  constructor(props) {
    super(props);
    this.viewPage = this.viewPage.bind(this);
  }

  viewPage(e) {
    this.props.onItemClick(this.props.manga);
  }

  render() {
    const { title, uri, isNew } = this.props.page;
    const imageUrl = window.location.origin + encodeURI(uri);
    return (
      <StyledCard>
        <CardPrimaryAction onClick={this.viewPage}>
          <CardMedia
            style={{
              backgroundImage: `url("${imageUrl}")`
            }}
          />
          {isNew ?
            <div className="tag-groups">
              <Icon use="fiber_new" />
            </div>
          : ''}
          <div style={{ padding: '0 1rem 1rem' }}>
            <Typography className="manga-title ellipsis" use="subtitle1" tag="h3">
              {this.props.manga.title}
            </Typography>
            <Typography className="ellipsis" use="subtitle2">
              {title}
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
            <CardAction onClick={this.viewPage}>Read</CardAction>
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
