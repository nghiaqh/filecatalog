import { authorDetailReducer } from './components/templates/AuthorDetail';
import { authorListReducer } from './components/organisms/AuthorList';
import { mangaListReducer } from './components/organisms/MangaList';
import { pageListReducer } from './components/organisms/PageList';
import { mangaDetailReducer } from './components/templates/MangaDetail';
import { themePickerReducer } from './components/molecules/ThemePicker';
import { breadcrumbReducer } from './components/organisms/TopAppBar';

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
  authorListReducer,
  authorDetailReducer,
  mangaListReducer,
  pageListReducer,
  mangaDetailReducer,
  themePickerReducer,
  breadcrumbReducer
);

export default rootReducer;
