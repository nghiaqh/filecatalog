import React, { PureComponent } from 'react';
import { Button } from 'rmwc/Button';
import styled from 'react-emotion';

export class WithLoadMore extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { totalPages, pageNumber, items, render } = this.props;
    const content = render(items);
    const hideButton = totalPages === pageNumber;
    const pageIndex = parseInt(pageNumber) + 1;

    return (
      <React.Fragment>
        {content}

        {hideButton ? '' :
        <StyledButton
            dense outlined
            page-index={pageIndex}
            onClick={this.handleClick}
          >
            Load More
          </StyledButton>
        }
      </React.Fragment>
    );
  }

  handleClick(e) {
    e.preventDefault();
    const i = parseInt(e.target.getAttribute('page-index'));
    this.props.loadMore(i);
  }
}

const StyledButton = styled(Button)`
  display: block;
  margin: 10px auto;
`
