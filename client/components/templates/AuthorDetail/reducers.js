import {
  REQUEST_AUTHOR,
  RECEIVE_AUTHOR,
} from './actions';

const initialState = {
  authors: {}
};

const authorDetailReducer = (prevState, action) => {
  const state = Object.assign({}, initialState, prevState);
  switch (action.type) {
    case REQUEST_AUTHOR:
      return handleRequestAuthorAction(state, action);
    case RECEIVE_AUTHOR:
      return handleReceiveAuthorAction(state, action);
    default:
      return state;
  }
};

const handleRequestAuthorAction = (state, action) => {
  const { id } = action;
  return {
    ...state,
    authors: {
      ...state.authors,
      [id]: {
        retrieving: true
      }
    }
  };
};

const handleReceiveAuthorAction = (state, action) => {
  const { author, receivedAt } = action;
  author.retrieving = false;
  author.receivedAt = receivedAt;
  const id = author.id;

  return {
    ...state,
    authors: {
      ...state.authors,
      [id]: Object.assign({}, state.authors[id], author)
    }
  }
}

export default authorDetailReducer;
