import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { NavLink } from 'react-router-dom';
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

const StyledCard = styled(Card)(props => ({
  margin: '5px auto',

  '& .mdc-card__media': {
    paddingTop: '130%',
    backgroundSize: 'contain'
  },

  '& .mdc-card__action-buttons+.mdc-card__action-icons': {
    marginLeft: 0
  },

  '& .manga-title': {
    'marginBottom': 0,
    'fontWeight': 600
  },

  '& .tag-groups': {
    position: 'absolute',
    padding: '5px',
    width: '100%'
  },

  a: {
    color: props.theme.onSecondary,
    textTransform: 'capitalise'
  }
}));

export class MangaCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, title, coverPicture, isNew, authorId } = this.props.manga;
    const author = this.props.authors[authorId] || {};
    const coverUrl = window.location.origin + encodeURI(coverPicture);
    const mangaUrl = `/mangas/${id}`;

    return (
      <StyledCard theme={this.props.theme}>

        <NavLink to={mangaUrl}>
          <CardPrimaryAction>
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
        </NavLink>

        <CardActions>
          <CardActionButtons>
            <NavLink to={mangaUrl}>
              <CardAction>Read</CardAction>
            </NavLink>
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
    authors: state.entities.authors || {},
    theme: state.themes[state.enabledTheme]
  };
};

export default connect(mapStateToProps)(MangaCard);
