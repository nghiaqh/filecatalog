import { normalize, schema } from 'normalizr';
import {
  REQUEST_AUTHORS,
  RECEIVE_AUTHORS,
  REQUEST_AUTHOR_NUMBER,
  RECEIVE_AUTHOR_NUMBER
} from './actions';

const authorList = {
  display: {
    type: 'grid'
  },
  paginator: {
    items: [],
    total: 0,
    pageNumber: 1,
    pageSize: 12,
    order: 'name',
    filter: {},
    retrievingItems: false,
    retrievingTotal: false,
    receivedItemsAt: null,
    receivedTotalAt: null,
  }
};

const initialState = {
  authorList,
  authors: {}
};

const authorListReducer = (prevState, action) => {
  const state = Object.assign({}, initialState, prevState);
  switch (action.type) {
    case REQUEST_AUTHORS:
      return handleRequestAuthorsAction(state, action);
    case RECEIVE_AUTHORS:
      return handleReceiveAuthorsAction(state, action);
    case REQUEST_AUTHOR_NUMBER:
      return handleRequestAuthorNumber(state, action);
    case RECEIVE_AUTHOR_NUMBER:
      return handleReceiveAuthorNumber(state, action);
    default:
      return state;
  }
};

const handleRequestAuthorsAction = (state, action) => {
  const { pageSize, pageNumber, filter, order } = action;
  return {
    ...state,
    authorList: {
      ...state.authorList,
      paginator: {
        ...state.authorList.paginator,
        pageNumber,
        pageSize,
        filter,
        order,
        retrievingItems: true
      }
    }
  };
};

const handleReceiveAuthorsAction = (state, action) => {
  const { authors, receivedAt } = action;
  const author = new schema.Entity('authors');
  const mySchema = {
    authors: [author]
  };
  const normalizedData = normalize({authors: authors}, mySchema);

  return {
    ...state,
    authorList: {
      ...state.authorList,
      paginator: {
        ...state.authorList.paginator,
        items: normalizedData.result.authors,
        retrievingItems: false,
        receivedItemsAt: receivedAt
      }
    },
    authors: Object.assign({}, state.authors, normalizedData.entities.authors)
  }
}

const handleRequestAuthorNumber = (state, action) => {
  return {
    ...state,
    authorList: {
      ...state.authorList,
      paginator: {
        ...state.authorList.paginator,
        filter: action.filter,
        retrievingTotal: true
      }
    }
  }
}

const handleReceiveAuthorNumber = (state, action) => {
  return {
    ...state,
    authorList: {
      ...state.authorList,
      paginator: {
        ...state.authorList.paginator,
        total: action.total,
        retrievingTotal: false,
        receivedTotalAt: action.receivedAt
      }
    }
  }
}

export default authorListReducer;
