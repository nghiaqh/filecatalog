import {
  REQUEST_AUTHOR,
  RECEIVE_AUTHOR,
} from './actions';

const initialState = {
  entities: {
    authors: {}
  }
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
    entities: {
      ...state.entities,
      authors: {
        ...state.entities.authors,
        [id]: {
          retrieving: true
        }
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
    entities: {
      ...state.entities,
      authors: {
        ...state.entities.authors,
        [id]: Object.assign({}, state.entities.authors[id], author)
      }
    }
  }
}

export default authorDetailReducer;
