import { mangaListReducer } from './components/organisms/MangaList/index';
import { pageListReducer } from './components/organisms/PageList/index';

/**
 * Combine reducers to make a flat state
 * @param {Array} reducers a list of reducers
 */
const reduceReducers = (...reducers) => (prevState, value, ...args) =>
  reducers.reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState
  );

const rootReducer = reduceReducers(mangaListReducer, pageListReducer);

export default rootReducer;
