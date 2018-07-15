import { normalize, schema } from 'normalizr';
import {
  REQUEST_PAGES,
  RECEIVE_PAGES,
  REQUEST_PAGE_NUMBER,
  RECEIVE_PAGE_NUMBER,
  CHANGE_DISPLAY
} from './actions';

const pageList = {
  display: {
    type: 'grid'
  },
  paginator: {
    items: [],
    total: 0,
    pageNumber: 1,
    pageSize: 12,
    order: 'title',
    filter: {},
    retrievingItems: false,
    retrievingTotal: false,
    receivedItemsAt: null,
    receivedTotalAt: null,
  }
};

const initialState = {
  pageList,
  pages: {}
};

const pageListReducer = (prevState = {}, action) => {
  const state = Object.assign({}, initialState, prevState);
  switch (action.type) {
    case REQUEST_PAGES:
      return handleRequestPagesAction(state, action);
    case RECEIVE_PAGES:
      return handleReceivePagesAction(state, action);
    case REQUEST_PAGE_NUMBER:
      return handleRequestPageNumber(state, action);
    case RECEIVE_PAGE_NUMBER:
      return handleReceivePageNumber(state, action);
    case CHANGE_DISPLAY:
      return handleChangeDisplay(state, action);
    default:
      return state;
  }
};

const handleRequestPagesAction = (state, action) => {
  const { pageSize, pageNumber, filter, order } = action;
  return {
    ...state,
    pageList: {
      ...state.pageList,
      paginator: {
        ...state.pageList.paginator,
        pageNumber,
        pageSize,
        filter,
        order,
        retrievingItems: true
      }
    }
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
    pageList: {
      ...state.pageList,
      paginator: {
        ...state.pageList.paginator,
        items: normalizedData.result.pages,
        retrievingItems: false,
        receivedItemsAt: receivedAt
      }
    },
    pages: Object.assign({}, state.pages, normalizedData.entities.pages)
  }
}

const handleRequestPageNumber = (state, action) => {
  return {
    ...state,
    pageList: {
      ...state.pageList,
      paginator: {
        ...state.pageList.paginator,
        filter: action.filter,
        retrievingTotal: true
      }
    }
  }
}

const handleReceivePageNumber = (state, action) => {
  return {
    ...state,
    pageList: {
      ...state.pageList,
      paginator: {
        ...state.pageList.paginator,
        total: action.total,
        retrievingTotal: false,
        receivedTotalAt: action.receivedAt
      }
    }
  }
}

const handleChangeDisplay = (state, action) => {
  const { items, pageNumber, pageSize } = state.pageList.paginator;
  const x = [];
  if (action.display.type === 'page') {
    x.push(items[action.pageNumber - (pageNumber - 1) * pageSize - 1]);
  } else {
    x.concat(items);
  }

  return {
    ...state,
    pageList: {
      ...state.pageList,
      display: action.display,
      paginator: {
        ...state.pageList.paginator,
        items: x,
        pageNumber: action.pageNumber,
        pageSize: action.pageSize,
        filter: action.filter
      }
    }
  }
}

export default pageListReducer;
