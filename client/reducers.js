import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { mangaListReducer } from './components/organisms/MangaList/index';
import { pageListReducer } from './components/organisms/PageList/index';


// const rootReducer = combineReducers({
//   mangaList: mangaListReducer,
//   pageList: pageListReducer
// });

const rootReducer = reduceReducers(mangaListReducer);

export default rootReducer;
