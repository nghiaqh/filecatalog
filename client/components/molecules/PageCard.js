import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import {
  Card,
  CardPrimaryAction,
  CardMedia
} from 'rmwc/Card';
import { Typography } from 'rmwc/Typography';

const StyledCard = styled(Card)`
  margin: 5px auto;

  .mdc-card__media {
    padding-top: 130%;
    background-size: contain;
  }

  .manga-title {
    margin-bottom: 0;
    font-weight: 600;
  }
`;

export default class PageCard extends PureComponent {
  constructor(props) {
    super(props);
    this.viewPage = this.viewPage.bind(this);
  }

  viewPage(e) {
    this.props.onItemClick(this.props.page);
  }

  render() {
    const { uri, number } = this.props.page;
    const imageUrl = window.location.origin + encodeURI(uri);
    return (
      <StyledCard>
        <CardPrimaryAction onClick={this.viewPage}>
          <CardMedia
            style={{
              backgroundImage: `url("${imageUrl}")`
            }}
          />
          <div style={{ padding: '1rem' }}>
            <Typography className="ellipsis" use="subtitle2">
              {number}
            </Typography>
          </div>
        </CardPrimaryAction>
      </StyledCard>
    );
  }
}
