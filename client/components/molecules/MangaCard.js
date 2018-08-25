import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
  margin: 5px auto;

  .mdc-card__media {
    padding-top: 130%;
    background-size: contain;
  }

  .mdc-card__action-buttons+.mdc-card__action-icons {
    margin-left: 0;
  }

  .manga-title {
    margin-bottom: 0;
    font-weight: 600;
  }

  .tag-groups {
    position: absolute;
    padding: 5px;
    width: 100%;
  }
`;

export class MangaCard extends PureComponent {
  constructor(props) {
    super(props);
    this.viewManga = this.viewManga.bind(this);
  }

  viewManga(e) {
    this.props.onItemClick(this.props.manga);
  }

  render() {
    const { title, coverPicture, isNew, authorId } = this.props.manga;
    const author = this.props.authors[authorId] || {};
    const coverUrl = window.location.origin + encodeURI(coverPicture);
    return (
      <StyledCard>
        <CardPrimaryAction onClick={this.viewManga}>
          <CardMedia
            style={{
              backgroundImage: `url("${coverUrl}")`
            }}
            title={title}
          />
          {isNew ?
            <div className="tag-groups">
              <Icon use="fiber_new" />
            </div>
          : ''}
          <div style={{ padding: '0 1rem 0' }}>
            <Typography className="manga-title ellipsis" use="subtitle1" tag="h3">
              {title}
            </Typography>
            <Typography className="ellipsis" use="subtitle2">
              {author.name}
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
            <CardAction onClick={this.viewManga}>Read</CardAction>
          </CardActionButtons>
          <CardActionIcons>
            <CardAction use="more_vert" />
          </CardActionIcons>
        </CardActions>
      </StyledCard>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authors: state.entities.authors || {}
  };
};

export default connect(mapStateToProps)(MangaCard);
