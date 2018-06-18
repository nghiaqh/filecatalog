import React from 'react';

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
    <div>
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
    </div>
  );
};

export default PaginationLinks;
