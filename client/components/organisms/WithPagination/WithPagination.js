import equal from 'deep-equal';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { Select } from '@rmwc/select';
import styled from 'react-emotion';

class WithPagination extends PureComponent {
  constructor(props) {
    super(props);
    this.renderPaginationControl = this.renderPaginationControl.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.loadPagination = this.loadPagination.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render() {
    const { withPagination, entities, id, render, entityType } = this.props;
    const data = withPagination[id] || { items: [] };
    const { items } = data;

    const contents = Array.isArray(items)
      ? items.map(i => entities[entityType][i])
      : [];
    const content = render(contents);
    const control = this.renderPaginationControl();

    return (
      <React.Fragment>
        {content}
        {control}
      </React.Fragment>
    );
  }

  componentDidMount() {
    const { dispatch, filter, load, id, pageSize, pageNumber } = this.props;
    dispatch(load(id, pageSize, pageNumber, filter));
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps) {
    const { dispatch, filter, id, load, pageSize, pageNumber } = this.props;
    if (
      equal(filter, prevProps.filter)
      && pageSize === prevProps.pageSize
      && pageNumber === prevProps.pageNumber
    ) return;

    dispatch(load(id, pageSize, pageNumber, filter));
  }

  renderPaginationControl() {
    const { withPagination, id } = this.props;
    const data = withPagination[id] || {
      pageNumber: 1,
      pageSize: 20,
      total: 0
    };
    const { pageNumber, total, pageSize } = data;

    let i = 0;
    const options = Array(total).fill('').map(n => ({
      label: ++i, value: i
    }));

    const totalPages = Math.ceil(total / pageSize);
    const current = parseInt(pageNumber);
    const prevDisabled = current === 1 ? { disabled: true } : null;
    const nextDisabled = current === totalPages ? { disabled: true } : null;

    if (total <= 1) return null;

    return (
      <PaginationControl>
        <Button dense
          {...prevDisabled}
          page-index={current - 1}
          onClick={this.handleClick}>
          Prev
        </Button>

        <Select value={current} options={options} onChange={this.handleSelect}/>

        <Button dense
          {...nextDisabled}
          page-index={current + 1}
          onClick={this.handleClick}>
          Next
        </Button>
      </PaginationControl>
    )
  }

  handleClick(e) {
    e.preventDefault();
    const i = parseInt(e.target.getAttribute('page-index'));
    this.loadPagination(i);
  }

  handleSelect(e) {
    this.loadPagination(e.target.value);
  }

  handleKeyDown(e) {
    const pageNumber = parseInt(this.props.pageNumber);
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        return this.loadPagination(pageNumber - 1);
      case 'ArrowRight':
        e.preventDefault();
        return this.loadPagination(pageNumber + 1);
    }
  }

  loadPagination(number) {
    const { dispatch, withPagination, filter, id, load, pageSize } = this.props;
    const { total, pageNumber } = withPagination[id];
    const totalPages = Math.ceil(parseInt(total) / parseInt(pageSize));

    if (number <= totalPages && number !== pageNumber) {
      dispatch(load(id, pageSize, number, filter));
      this.props.onAfter(number);
    }
  }
}

const PaginationControl = styled('div')`
  display: block;
  margin: 10px auto;
  text-align: center;
`

// container
const mapStateToProps = (state) => {
  const { withPagination, entities } = state;

  return {
    withPagination,
    entities
  };
};

export default connect(mapStateToProps)(WithPagination);
