import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CardPrimaryAction,
  CardMedia,
  CardMediaContent
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { StyledCard } from '@molecule/MangaCard';
import Picture from '@atom/Picture';

export class PageCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { uri, number, mangaId } = this.props.page;
    const imageUrl = `${encodeURI(uri)}`;
    const pageUrl = `/mangas/${mangaId}/${number}`;

    return (
      <StyledCard theme={this.props.theme}>
        <Link to={pageUrl}>
          <CardPrimaryAction>
            <CardMedia>
              <CardMediaContent>
                <Picture src={imageUrl} />
              </CardMediaContent>
            </CardMedia>
            <Typography className="card-title ellipsis text-center" use="subtitle2"
              style={{ padding: '5px 0' }}>
              {number}
            </Typography>
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
