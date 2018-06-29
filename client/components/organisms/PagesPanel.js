import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import PageList from './PageList';
import { Typography } from 'rmwc/Typography';

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
        {manga ? <Typography className="ellipsis" use="headline5">{manga.title}</Typography> : ''}

        <StyledPageList
          {...this.props}
        />
      </section>
    );
  }
}
