import merge from 'lodash/merge';

const initialState = {
  entities: {},
  withPagination: {}
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
    withPagination: {
      ...state.withPagination,
      [id]: {
        ...state.withPagination[id],
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
  const { id, receivedAt, entities, items } = action;

  return {
    ...state,
    withPagination: {
      ...state.withPagination,
      [id]: {
        ...state.withPagination[id],
        items,
        retrievingItems: false,
        receivedItemsAt: receivedAt
      }
    },
    entities: merge(state.entities, entities)
  };
};

const onTotalRequested = (state, action) => {
  const { id } = action;

  return {
    ...state,
    withPagination: {
      ...state.withPagination,
      [id]: {
        ...state.withPagination[id],
        retrievingTotal: true
      }
    }
  };
};

const onTotalReceived = (state, action) => {
  const { id, total, receivedAt } = action;

  return {
    ...state,
    withPagination: {
      ...state.withPagination,
      [id]: {
        ...state.withPagination[id],
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
