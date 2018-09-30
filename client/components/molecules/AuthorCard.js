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
import LazyLoad from 'react-lazyload';
import Picture from '@atom/Picture';
import Avatar from '@atom/Avatar';
import Placeholder from '@atom/Placeholder';

export class AuthorCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    };

    this.renderCardPrimaryAction = this.renderCardPrimaryAction.bind(this)
  }

  render() {
    const {theme} = this.props;
    return (
      <LazyLoad once={true} height='100%'
        placeholder={<Placeholder theme={theme} />} >
        <StyledCard theme={theme}>
          {this.renderCardPrimaryAction()}
        </StyledCard>
      </LazyLoad>
    );
  }

  renderCardPrimaryAction() {
    const { id, name, coverPicture, mangasCount, gender } = this.props.author;
    const coverPicUrl = `${encodeURI(coverPicture)}`;
    const authorUrl = `/authors/${id}`;
    const secondaryText = `${mangasCount} ${mangasCount > 1 ? 'mangas' : 'manga'}`

    return (
      <Link to={authorUrl}>
        <CardPrimaryAction>
          <CardMedia>
            <CardMediaContent>
              {coverPicture
                ? <Picture src={coverPicUrl} title={name} />
                : <Avatar seed={name} collection={gender} /> }
            </CardMediaContent>
          </CardMedia>

          <div style={{ padding: '0 8px' }}>
            <Typography className="card-title ellipsis" use="subtitle1" tag="h3">
              {name}
            </Typography>
            <Typography className="ellipsis" use="subtitle2">
              {mangasCount ? secondaryText : ''}
            </Typography>
          </div>
        </CardPrimaryAction>
      </Link>
    )
  }
}

export const StyledCard = styled(Card)(props => ({
  textAlign: 'center',
  padding: '0 0 5px 0',

  '& .mdc-card__media': {
    paddingTop: '100%',
    backgroundSize: 'contain'
  },

  '& .mdc-card__action-buttons+.mdc-card__action-icons': {
    marginLeft: 0
  },

  '& .card-title': {
    'marginBottom': 0,
    'fontWeight': 600
  },

  'a, .mdc-button:not(:disabled)': {
    color: props.theme.onSurface,
    textTransform: 'capitalise'
  }
}));

const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.enabledTheme]
  };
};

export default connect(mapStateToProps)(AuthorCard);
