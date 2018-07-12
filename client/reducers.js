import { combineReducers } from 'redux';
import { mangaListReducer } from './components/organisms/MangaList/index';

const rootReducer = combineReducers({
  mangaList: mangaListReducer
});

export default rootReducer;
