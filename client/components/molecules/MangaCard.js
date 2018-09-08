import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { Icon } from '@rmwc/icon';
import { SimpleMenu, MenuItem } from '@rmwc/menu';

export class MangaCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    };

    this.renderCardPrimaryAction = this.renderCardPrimaryAction.bind(this)
    this.renderCardActions = this.renderCardActions.bind(this)
  }

  render() {
    return (
      <StyledCard theme={this.props.theme}>
        {this.renderCardPrimaryAction()}
        {this.renderCardActions()}
      </StyledCard>
    );
  }

  renderCardPrimaryAction() {
    const { id, title, coverPicture, isNew, authorId } = this.props.manga;
    const author = this.props.authors[authorId] || {};
    const coverUrl = window.location.origin + encodeURI(coverPicture);
    const mangaUrl = `/mangas/${id}`;

    return (
      <Link to={mangaUrl}>
        <CardPrimaryAction>
            <CardMedia
              style={{
                backgroundImage: `url("${coverUrl}")`
              }}
              title={title}
            />

          {isNew &&
            <div className="tag-groups">
              <Icon icon="fiber_new" />
            </div>
          }

          <div style={{ padding: '0 8px' }}>
            <Typography className="card-title ellipsis" use="subtitle1" tag="h3">
              {title}
            </Typography>
            <Typography className="ellipsis" use="subtitle2">
              {author.name}
            </Typography>
          </div>
        </CardPrimaryAction>
      </Link>
    )
  }

  renderCardActions() {
    const { id } = this.props.manga;
    const mangaUrlPageOne = `/mangas/${id}/1`;

    return (
      <CardActions>
        <CardActionButtons>
          <Link to={mangaUrlPageOne}>
            <CardAction>Read</CardAction>
          </Link>
        </CardActionButtons>

        <CardActionIcons>
          <SimpleMenu
            handle={<CardAction icon="more_vert" onClick={this.openMenu} />}
          >
            <MenuItem>Add to favorite</MenuItem>
            <MenuItem>Edit</MenuItem>
          </SimpleMenu>
        </CardActionIcons>
      </CardActions>
    )
  }
}

export const StyledCard = styled(Card)(props => ({
  margin: '5px auto',

  '& .mdc-card__media': {
    paddingTop: '140%',
    backgroundSize: 'contain'
  },

  '& .mdc-card__action-buttons+.mdc-card__action-icons': {
    marginLeft: 0
  },

  '& .card-title': {
    'marginBottom': 0,
    'fontWeight': 600
  },

  '& .tag-groups': {
    position: 'absolute',
    padding: '5px',
    width: '100%'
  },

  'a, .mdc-button:not(:disabled)': {
    color: props.theme.onSurface,
    textTransform: 'capitalise'
  }
}));

const mapStateToProps = (state) => {
  return {
    authors: state.entities.authors || {},
    theme: state.themes[state.enabledTheme]
  };
};

export default connect(mapStateToProps)(MangaCard);
