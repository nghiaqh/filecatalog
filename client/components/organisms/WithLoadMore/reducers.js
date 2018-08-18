import merge from 'lodash/merge';

const initialState = {
  entities: {},
  withLoadMore: {}
};

const onDataRequested = (state, action) => {
  const {
    order,
    filter,
    pageSize,
    pageNumber,
    id
  } = action;

  return {
    ...state,
    withLoadMore: {
      ...state.withLoadMore,
      [id]: {
        ...state.withLoadMore[id],
        pageNumber,
        pageSize,
        filter,
        order,
        retrievingItems: true
      }
    }
  };
};

const onDataReceived = (state, action) => {
  const { id, items, receivedAt, entities } = action;
  const prevItems = state.withLoadMore[id].items || [];
  return {
    ...state,
    withLoadMore: {
      ...state.withLoadMore,
      [id]: {
        ...state.withLoadMore[id],
        items: prevItems.concat(items),
        retrievingItems: false,
        receivedItemsAt: receivedAt
      }
    },
    entities: merge(state.entities, entities)
  };
};

const onTotalRequested = (state, action) => {
  const { id, filter } = action;

  return {
    ...state,
    withLoadMore: {
      ...state.withLoadMore,
      [id]: {
        ...state.withLoadMore[id],
        filter,
        retrievingTotal: true
      }
    }
  };
};

const onTotalReceived = (state, action) => {
  const { id, total, receivedAt } = action;

  return {
    ...state,
    withLoadMore: {
      ...state.withLoadMore,
      [id]: {
        ...state.withLoadMore[id],
        total,
        retrievingTotal: false,
        retrievingTotalAt: receivedAt
      }
    }
  };
};

export {
  initialState,
  onDataRequested,
  onDataReceived,
  onTotalRequested,
  onTotalReceived
};
