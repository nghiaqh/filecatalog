import equal from 'deep-equal';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button } from 'rmwc/Button';
import styled from 'react-emotion';

class WithLoadMore extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const {
      withLoadMore,
      entities,
      id,
      render,
      entityType,
      pageSize
    } = this.props;
    const data = withLoadMore[id] || {
      items: [],
      pageNumber: 1,
      pageSize: 20,
      total: 0
    };
    const { items, pageNumber, total } = data;

    const contents = Array.isArray(items)
      ? items.map(i => entities[entityType][i])
      : [];
    const dom = render(contents);

    const totalPages = Math.ceil(total / pageSize);
    const hideButton = totalPages === pageNumber;

    return (
      <React.Fragment>
        {dom}

        {hideButton ? '' :
          <StyledButton dense outlined onClick={this.handleClick}>
            Load More
          </StyledButton>
        }
      </React.Fragment>
    );
  }

  componentDidMount() {
    const { dispatch, filter, loadMore, id, pageSize } = this.props;
    dispatch(loadMore(id, pageSize, 1, filter));
    // window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const {
      dispatch,
      filter,
      id,
      loadMore,
      pageSize
    } = this.props;
    if (equal(filter, prevProps.filter)) return;

    dispatch(loadMore(id, pageSize, 1, filter));
  }

  handleClick(e) {
    e.preventDefault();
    const { dispatch, withLoadMore, id, loadMore } = this.props;
    const { pageNumber, total, pageSize, filter } = withLoadMore[id];
    const totalPages = Math.ceil(total / pageSize);
    if (pageNumber + 1 <= totalPages) {
      dispatch(loadMore(id, pageSize, pageNumber + 1, filter));
    }
  }
}

const StyledButton = styled(Button)`
  display: block;
  margin: 10px auto;
`

// container
const mapStateToProps = (state) => {
  const { withLoadMore, entities } = state;

  return {
    withLoadMore,
    entities
  };
};

export default connect(mapStateToProps)(WithLoadMore);
