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
