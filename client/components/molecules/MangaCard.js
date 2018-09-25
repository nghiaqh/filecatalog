import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardMediaContent,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import Picture from '@atom/Picture';

export class MangaCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    };

    this.renderCardPrimaryAction = this.renderCardPrimaryAction.bind(this)
    this.renderCardActions = this.renderCardActions.bind(this)
    this.handleMenuSelect = this.handleMenuSelect.bind(this)
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
    const { id, title, coverPicture, authorId } = this.props.manga;
    const author = this.props.authors[authorId] || {};
    const coverPicUrl = `${encodeURI(coverPicture)}`;
    const mangaUrl = `/mangas/${id}`;

    return (
      <Link to={mangaUrl}>
        <CardPrimaryAction>
          <CardMedia>
            <CardMediaContent>
              <Picture src={coverPicUrl} title={title} />
            </CardMediaContent>
          </CardMedia>

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
    const mangaEditUrl = `/mangas/${id}/edit`;

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
            onSelect={this.handleMenuSelect}
          >
            <MenuItem>Add to favorite</MenuItem>
            <MenuItem><Link to={mangaEditUrl}>Edit</Link></MenuItem>
          </SimpleMenu>
        </CardActionIcons>
      </CardActions>
    )
  }

  handleMenuSelect(event) {
    event.preventDefault();
    switch(event.detail.index) {
      case 0:
        break;
      case 1:
        const { id } = this.props.manga;
        const mangaEditUrl = `/mangas/${id}/edit`;
        this.props.history.push(mangaEditUrl);
        break;
    }
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
