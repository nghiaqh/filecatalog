import React from 'react';
import styled from 'react-emotion';

const Box = styled('div')`
  margin: 20px 0;
  font-weight: 500;

  button {
    margin: 0 15px;
  }
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
        <button className="no-border" page-index={current - 1} onClick={handleClick}>Prev</button>
      ) : (
        ''
      )}
      { current > 0 ? (<span>{' '}{current} / {total}{' '}</span>) : '' }
      { current < total ? (
        <button className="no-border" page-index={current + 1} onClick={handleClick}>Next</button>
      ) : (
        ''
      )}
    </Box>
  );
};

export default PaginationLinks;
