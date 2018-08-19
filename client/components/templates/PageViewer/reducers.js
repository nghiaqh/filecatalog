import {
  REQUEST_PAGES,
  RECEIVE_PAGES,
  REQUEST_PAGE_NUMBER,
  RECEIVE_PAGE_NUMBER,
} from './actions';

import {
  initialState,
  onDataRequested,
  onDataReceived,
  onTotalRequested,
  onTotalReceived
} from '../../organisms/WithPagination';

const pageViewerReducer = (prevState = {}, action) => {
  const state = Object.assign({}, initialState, prevState);
  if (action.reducer !== 'WITH_PAGINATION') return state;

  switch (action.type) {
    case REQUEST_PAGES:
      return onDataRequested(state, action);
    case RECEIVE_PAGES:
      return onDataReceived(state, action);
    case REQUEST_PAGE_NUMBER:
      return onTotalRequested(state, action);
    case RECEIVE_PAGE_NUMBER:
      return onTotalReceived(state, action);
    default:
      return state;
  }
};

export {
  pageViewerReducer
};
