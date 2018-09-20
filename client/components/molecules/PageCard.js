import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CardPrimaryAction,
  CardMedia
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { StyledCard } from '@molecule/MangaCard';

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
        <Link to={pageUrl}>
          <CardPrimaryAction onClick={this.viewPage}>
            <CardMedia
              style={{
                backgroundImage: `url("${imageUrl}")`
              }}
            />
            <div style={{ padding: '5px 0' }}>
              <Typography className="card-title ellipsis text-center" use="subtitle2">
                {number}
              </Typography>
            </div>
          </CardPrimaryAction>
        </Link>
      </StyledCard>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.enabledTheme]
  };
};

export default connect(mapStateToProps)(PageCard);
