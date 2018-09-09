import {
  REQUEST_MANGA,
  RECEIVE_MANGA,
  UPDATE_MANGA,
  DELETE_MANGA,
  RECEIVE_UPDATE_MANGA_STATUS,
  RECEIVE_DELETE_MANGA_STATUS
} from './actions';

const initialState = {
  entities: {
    mangas: {}
  }
};

const mangaDetailReducer = (prevState, action) => {
  const state = Object.assign({}, initialState, prevState);
  switch (action.type) {
    case REQUEST_MANGA:
      return handleRequestManga(state, action);
    case RECEIVE_MANGA:
      return handleReceiveManga(state, action);
    case UPDATE_MANGA:
      return handleUpdateManga(state, action);
    case RECEIVE_UPDATE_MANGA_STATUS:
      return handleReceiveUpdateStatus(state, action);
    case DELETE_MANGA:
      return handleDeleteManga(state, action);
    case RECEIVE_DELETE_MANGA_STATUS:
      return handleReceiveDeleteStatus(state, action)
    default:
      return state;
  }
};

const handleRequestManga = (state, action) => {
  const { id } = action;
  return {
    ...state,
    entities:{
      ...state.entities,
      mangas: {
        ...state.entities.mangas,
        [id]: {
          retrieving: true
        }
      }
    }
  };
};

const handleReceiveManga = (state, action) => {
  const { manga, receivedAt } = action;
  const now = new Date();
  const then = new Date(manga.updated);
  manga.isNew = (now - then) / (1000 * 3600 * 24) <= 10;
  manga.retrieving = false;
  manga.receivedAt = receivedAt;
  const id = manga.id;

  return {
    ...state,
    entities: {
      ...state.entities,
      mangas: {
        ...state.entities.mangas,
        [id]: Object.assign({}, state.entities.mangas[id], manga)
      }
    }
  }
}

const handleUpdateManga = (state, action) => {
  const { manga } = action;
  const id = manga.id;
  manga.beingUpdated = true;

  return {
    ...state,
    entities: {
      ...state.entities,
      mangas: {
        ...state.entities.mangas,
        [id]: Object.assign({}, state.entities.mangas[id], manga)
      }
    }
  }
}

const handleReceiveUpdateStatus = (state, action) => {
  const { manga, receivedAt } = action;
  const id = manga.id;
  manga.beingUpdated = false;

  return {
    ...state,
    entities: {
      ...state.entities,
      mangas: {
        ...state.entities.mangas,
        [id]: Object.assign({}, state.entities.mangas[id], manga)
      }
    }
  }
}

const handleDeleteManga = (state, action) => {
  const id = action.id;
  return {
    ...state,
    entities: {
      ...state.entities,
      mangas: {
        ...state.entities.mangas,
        [id]: Object.assign({}, state.entities.mangas[id], { markedForDelete: true })
      }
    }
  }
}

const handleReceiveDeleteStatus = (state, action) => {
  const id = action.message.id;
  const newState = Object.assign({}, state);
  delete newState.entities.mangas[id];

  return newState;
}

export default mangaDetailReducer;
