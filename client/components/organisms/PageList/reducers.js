import { normalize, schema } from 'normalizr';
import {
  REQUEST_PAGES,
  RECEIVE_PAGES,
  REQUEST_PAGE_NUMBER,
  RECEIVE_PAGE_NUMBER
} from './actions';

const initialState = {
  display: {
    type: 'grid'
  },
  paginator: {
    items: [],
    total: 0,
    pageNumber: 1,
    pageSize: 12,
    order: 'created DESC',
    filter: {},
    retrievingItems: false,
    retrievingTotal: false,
    receivedItemsAt: null,
    receivedTotalAt: null,
  },
  entities: {}
};

const pageListReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PAGES:
      return handleRequestPagesAction(state, action);
    case RECEIVE_PAGES:
      return handleReceivePagesAction(state, action);
    case REQUEST_PAGE_NUMBER:
      return handleRequestPageNumber(state, action);
    case RECEIVE_PAGE_NUMBER:
      return handleReceivePageNumber(state, action);
    default:
      return state;
  }
};

const handleRequestPagesAction = (state, action) => {
  const { pageSize, pageNumber, filter, order } = action;
  return {
    ...state,
    paginator: Object.assign({}, state.paginator, {
      pageNumber,
      pageSize,
      filter,
      order,
      retrievingItems: true
    })
  };
};

const handleReceivePagesAction = (state, action) => {
  const { pages, receivedAt } = action;
  const temp = pages.map(page => {
    const now = new Date();
    const then = new Date(page.updated);
    page.isNew = (now - then) / (1000 * 3600 * 24) <= 10;
    return page;
  });

  const page = new schema.Entity('pages');
  const mySchema = {
    pages: [page]
  };
  const normalizedData = normalize({pages: temp}, mySchema);

  return {
    ...state,
    paginator: Object.assign({}, state.paginator, {
      items: normalizedData.result.pages,
      retrievingItems: false,
      receivedItemsAt: receivedAt
    }),
    entities: normalizedData.entities
  }
}

const handleRequestPageNumber = (state, action) => {
  return {
    ...state,
    paginator: Object.assign({}, state.paginator, {
      filter: action.filter,
      retrievingTotal: true
    })
  }
}

const handleReceivePageNumber = (state, action) => {
  return {
    ...state,
    paginator: Object.assign({}, state.paginator, {
      total: action.total,
      retrievingTotal: false,
      receivedTotalAt: action.receivedAt
    })
  }
}

export default pageListReducer;
