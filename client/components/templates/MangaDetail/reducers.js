import {
  REQUEST_MANGA,
  RECEIVE_MANGA,
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
      return handleRequestMangaAction(state, action);
    case RECEIVE_MANGA:
      return handleReceiveMangaAction(state, action);
    default:
      return state;
  }
};

const handleRequestMangaAction = (state, action) => {
  const { id } = action;
  return {
    ...state,
    entities: {
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

const handleReceiveMangaAction = (state, action) => {
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

export default mangaDetailReducer;
