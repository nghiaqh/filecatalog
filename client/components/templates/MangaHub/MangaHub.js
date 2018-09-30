import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { MangaList } from '@organism/MangaList';

export default class MangaHub extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledMangaHub>
        <MangaList
          uid='manga-hub'
          history={this.props.history}
        />
      </StyledMangaHub>
    );
  }
}

const StyledMangaHub = styled('section')`
  width: 100%;
`;
