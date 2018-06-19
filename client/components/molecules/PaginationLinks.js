import React from 'react';
import styled from 'react-emotion';

const Box = styled('div')`
  margin: 20px 0;
`

const PaginationLinks = (props) => {
  const total = props.total;
  const current = props.current;

  const handleClick = (e) => {
    e.preventDefault();
    const i = parseInt(e.target.getAttribute('page-index'));
    props.handlePagination(i);
  }

  if (total === 1) {
    return (
      <div></div>
    );
  }

  return (
    <Box>
      { current > 1 ? (
        <button page-index={current - 1} onClick={handleClick}>Prev</button>
      ) : (
        ''
      )}
      { current > 0 ? (<span>{' '}{current} / {total}{' '}</span>) : '' }
      { current < total ? (
        <button page-index={current + 1} onClick={handleClick}>Next</button>
      ) : (
        ''
      )}
    </Box>
  );
};

export default PaginationLinks;
