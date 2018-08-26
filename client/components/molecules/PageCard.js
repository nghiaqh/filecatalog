import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardPrimaryAction,
  CardMedia
} from 'rmwc/Card';
import { Typography } from 'rmwc/Typography';

export class PageCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { uri, number, mangaId } = this.props.page;
    const imageUrl = window.location.origin + encodeURI(uri);
    const pageUrl = `/mangas/${mangaId}/${number}`;

    return (
      <StyledCard theme={this.props.theme}>
        <NavLink to={pageUrl}>
          <CardPrimaryAction onClick={this.viewPage}>
            <CardMedia
              style={{
                backgroundImage: `url("${imageUrl}")`
              }}
            />
            <div style={{ padding: '8px' }}>
              <Typography className="ellipsis" use="subtitle2">
                {number}
              </Typography>
            </div>
          </CardPrimaryAction>
        </NavLink>
      </StyledCard>
    );
  }
}

const StyledCard = styled(Card)(props => ({
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

  a: {
    color: props.theme.onSecondary,
    textTransform: 'capitalise'
  }
}));

const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.enabledTheme]
  };
};

export default connect(mapStateToProps)(PageCard);
