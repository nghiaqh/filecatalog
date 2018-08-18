import {
  REQUEST_AUTHORS,
  RECEIVE_AUTHORS,
  REQUEST_AUTHOR_NUMBER,
  RECEIVE_AUTHOR_NUMBER
} from './actions';

import {
  initialState,
  onDataRequested,
  onDataReceived,
  onTotalRequested,
  onTotalReceived
} from '../WithLoadMore'

const authorListReducer = (prevState, action) => {
  const state = Object.assign({}, initialState, prevState);
  switch (action.type) {
    case REQUEST_AUTHORS:
      return onDataRequested(state, action);
    case RECEIVE_AUTHORS:
      return onDataReceived(state, action);
    case REQUEST_AUTHOR_NUMBER:
      return onTotalRequested(state, action);
    case RECEIVE_AUTHOR_NUMBER:
      return onTotalReceived(state, action);
    default:
      return state;
  }
};

export default authorListReducer;
