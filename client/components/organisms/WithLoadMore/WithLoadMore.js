import equal from 'deep-equal';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
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
      entityType
    } = this.props;
    const data = withLoadMore[id] || {
      items: [],
      pageNumber: 1,
      total: 0,
      retrievingItems: true
    };
    const { items, pageNumber, total, retrievingItems } = data;
    const pageSize = this.props.pageSize || 20;

    const contents = Array.isArray(items)
      ? items.map(i => entities[entityType][i])
      : [];
    const dom = render(contents, retrievingItems);

    const totalPages = Math.ceil(total / pageSize);
    const showButton = totalPages > pageNumber && !retrievingItems;

    return (
      <React.Fragment>
        {dom}

        {showButton &&
          <StyledButton dense outlined onClick={this.handleClick}>
            Load More
          </StyledButton>
        }
      </React.Fragment>
    );
  }

  componentDidMount() {
    const { dispatch, filter, loadMore, id, pageSize, order } = this.props;
    dispatch(loadMore(id, pageSize, 1, filter, order));
    // window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const {
      dispatch,
      filter,
      id,
      loadMore,
      pageSize,
      order
    } = this.props;
    if (equal(filter, prevProps.filter) && order === prevProps.order) return;

    dispatch(loadMore(id, pageSize, 1, filter, order));
  }

  handleClick(e) {
    e.preventDefault();
    const { dispatch, withLoadMore, id, loadMore, order } = this.props;
    const { pageNumber, total, pageSize, filter } = withLoadMore[id];
    const totalPages = Math.ceil(total / pageSize);
    if (pageNumber + 1 <= totalPages) {
      dispatch(loadMore(id, pageSize, pageNumber + 1, filter, order));
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
