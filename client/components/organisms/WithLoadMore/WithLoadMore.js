import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button } from 'rmwc/Button';

export class WithLoadMore extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const total = parseInt(this.props.totalPages);
    const current = parseInt(this.props.pageNumber);
    const disabled = current === total ? { disabled: true } : null;

    return (
      <React.Fragment>
        {this.props.render}

        <Button
          dense
          {...disabled}
          page-index={current + 1}
          onClick={this.handleClick}
        >
          Load More
        </Button>
      </React.Fragment>
    );
  }

  handleClick(e) {
    e.preventDefault();
    const i = parseInt(e.target.getAttribute('page-index'));
    this.props.loadMore(i);
  }
}
