import { normalize, schema } from 'normalizr';
import {
  REQUEST_MANGAS,
  RECEIVE_MANGAS,
  REQUEST_MANGA_NUMBER,
  RECEIVE_MANGA_NUMBER
} from './actions';

const mangaList = {
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
  }
};

const initialState = {
  mangaList,
  mangas: {}
};

const mangaListReducer = (prevState, action) => {
  const state = Object.assign({}, initialState, prevState);
  switch (action.type) {
    case REQUEST_MANGAS:
      return handleRequestMangasAction(state, action);
    case RECEIVE_MANGAS:
      return handleReceiveMangasAction(state, action);
    case REQUEST_MANGA_NUMBER:
      return handleRequestMangaNumber(state, action);
    case RECEIVE_MANGA_NUMBER:
      return handleReceiveMangaNumber(state, action);
    default:
      return state;
  }
};

const handleRequestMangasAction = (state, action) => {
  const { pageSize, pageNumber, filter, order } = action;
  return {
    ...state,
    mangaList: {
      ...state.mangaList,
      paginator: {
        ...state.mangaList.paginator,
        pageNumber,
        pageSize,
        filter,
        order,
        retrievingItems: true
      }
    }
  };
};

const handleReceiveMangasAction = (state, action) => {
  const { mangas, receivedAt } = action;
  const temp = mangas.map(manga => {
    const now = new Date();
    const then = new Date(manga.updated);
    manga.isNew = (now - then) / (1000 * 3600 * 24) <= 10;
    return manga;
  });

  const manga = new schema.Entity('mangas');
  const mySchema = {
    mangas: [manga]
  };
  const normalizedData = normalize({mangas: temp}, mySchema);

  return {
    ...state,
    mangaList: {
      ...state.mangaList,
      paginator: {
        ...state.mangaList.paginator,
        items: normalizedData.result.mangas,
        retrievingItems: false,
        receivedItemsAt: receivedAt
      }
    },
    mangas: Object.assign({}, state.mangas, normalizedData.entities.mangas)
  }
}

const handleRequestMangaNumber = (state, action) => {
  return {
    ...state,
    mangaList: {
      ...state.mangaList,
      paginator: {
        ...state.mangaList.paginator,
        filter: action.filter,
        retrievingTotal: true
      }
    }
  }
}

const handleReceiveMangaNumber = (state, action) => {
  return {
    ...state,
    mangaList: {
      ...state.mangaList,
      paginator: {
        ...state.mangaList.paginator,
        total: action.total,
        retrievingTotal: false,
        receivedTotalAt: action.receivedAt
      }
    }
  }
}

export default mangaListReducer;
