import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { Elevation } from 'rmwc/Elevation';
import { Button } from 'rmwc/Button';
import { Select } from 'rmwc/Select';

export class PaginatorControl extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    const total = parseInt(this.props.totalPages);
    const current = parseInt(this.props.pageNumber);
    let i = 0;
    const options = Array(total).fill('').map(n => ({
      label: ++i, value: i
    }));
    const prevDisabled = current === 1 ? { disabled: true } : null;
    const nextDisabled = current === total ? { disabled: true } : null;

    if (total <= 1) {
      return (
        <div></div>
      );
    }

    return (
      <div className={this.props.className}>
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
      </div>
    );
  }

  handleClick(e) {
    e.preventDefault();
    const i = parseInt(e.target.getAttribute('page-index'));
    this.props.handlePagination(i);
  }

  handleSelect(e) {
    this.props.handlePagination(e.target.value);
  }
}

export class ElevatedPaginatorControl extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.totalPages <= 1) return '';

    return (
      <StyledElevation
        z={this.props.z}
        transition
        wrap
        >
        <PaginatorControl
          handlePagination={this.props.handlePagination}
          pageNumber={this.props.pageNumber}
          totalPages={this.props.totalPages}
        />
      </StyledElevation>
    );
  }
}

const StyledElevation = styled(Elevation)(props => `
  background: ${props.z ? 'var(--mdc-theme-surface)' : 'transparent'};
  border: 1px solid ${props.z ? 'var(--mdc-theme-text-disabled-on-light)' : 'transparent'};
  position: ${props.z ? 'fixed' : 'relative'};
  bottom: 0;
  height: 60px;
  width: 190px;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 10px;
  text-align: center;
`);
