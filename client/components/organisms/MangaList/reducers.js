import {
  REQUEST_MANGAS,
  RECEIVE_MANGAS,
  REQUEST_MANGA_NUMBER,
  RECEIVE_MANGA_NUMBER
} from './actions';

import {
  initialState,
  onDataRequested,
  onDataReceived,
  onTotalRequested,
  onTotalReceived
} from '../WithLoadMore'

const mangaListReducer = (prevState, action) => {
  const state = Object.assign({}, initialState, prevState);
  switch (action.type) {
    case REQUEST_MANGAS:
      return onDataRequested(state, action);
    case RECEIVE_MANGAS:
      return onDataReceived(state, action);
    case REQUEST_MANGA_NUMBER:
      return onTotalRequested(state, action);
    case RECEIVE_MANGA_NUMBER:
      return onTotalReceived(state, action);
    default:
      return state;
  }
};

export default mangaListReducer;
