import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import PageList from './PageList';

const StyledPageList = styled(PageList)`
  ul {
    flex-direction: row;
    flex-wrap: wrap;
  }

  li {
    flex-basis: 25%;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

export default class PagesPanel extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const manga = this.props.manga;

    return (
      <section>
        {manga ? (<h3>{manga.title}</h3>) : ''}

        <StyledPageList
          {...this.props}
        />
      </section>
    );
  }
}
