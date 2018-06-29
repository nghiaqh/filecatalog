import React from 'react';
import styled from 'react-emotion';
import { Button, ButtonIcon } from 'rmwc/Button';
import { Select } from 'rmwc/Select';

const PaginationLinks = (props) => {
  const total = parseInt(props.total);
  const current = parseInt(props.current);
  let i = 0;
  const options = Array(total).fill('').map(n => ({
    label: ++i, value: i
  }));
  const prevDisabled = current === 1 ? { disabled: true } : null;
  const nextDisabled = current === total ? { disabled: true } : null;

  const handleClick = (e) => {
    e.preventDefault();
    const i = parseInt(e.target.getAttribute('page-index'));
    props.handlePagination(i);
  }

  const handleSelect = (e) => {
    props.handlePagination(e.target.value);
  }

  if (total <= 1) {
    return (
      <div></div>
    );
  }

  return (
    <div>
      <Button dense
        {...prevDisabled}
        page-index={current - 1}
        onClick={handleClick}>
        Prev
      </Button>

      <Select value={current} options={options} onChange={handleSelect}/>

      <Button dense
        {...nextDisabled}
        page-index={current + 1}
        onClick={handleClick}>
        Next
      </Button>
    </div>
  );
};

export default PaginationLinks;
