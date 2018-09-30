import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { AuthorList } from '@organism/AuthorList';

export default class AuthorHub extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      authorListOrder: 'mangasCount DESC'
    };
  }

  render() {
    return (
      <StyledAuthorHub>
        <AuthorList
          uid={'author-hub'}
          searchText=''
          order={this.state.authorListOrder}
        />
      </StyledAuthorHub>
    );
  }
}

const StyledAuthorHub = styled('section')`
  width: 100%;
`;
