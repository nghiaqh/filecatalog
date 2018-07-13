import { combineReducers } from 'redux';
import { mangaListReducer } from './components/organisms/MangaList/index';
import { pageListReducer } from './components/organisms/PageList/index';

const initialState = {
  entities: {}
}

const rootReducer = combineReducers({
  mangaList: mangaListReducer,
  pageList: pageListReducer
});

export default rootReducer;
