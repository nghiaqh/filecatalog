import { mangaListReducer } from './components/organisms/MangaList/index';
import { pageListReducer } from './components/organisms/PageList/index';
import { mangaDetailReducer } from './components/templates/MangaDetail';
import { themePickerReducer } from './components/molecules/ThemePicker';

/**
 * Combine reducers to make a flat state
 * @param {Array} reducers a list of reducers
 */
const reduceReducers = (...reducers) => (prevState, value, ...args) =>
  reducers.reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState
  );

const rootReducer = reduceReducers(
  mangaListReducer,
  pageListReducer,
  mangaDetailReducer,
  themePickerReducer
);

export default rootReducer;
