import { authorDetailReducer } from '@template/AuthorDetail';
import { authorListReducer } from '@organism/AuthorList';
import { mangaListReducer } from '@organism/MangaList';
import { pageListReducer } from '@organism/PageList';
import { mangaDetailReducer } from '@template/MangaDetail';
import { themePickerReducer } from '@molecule/ThemePicker';
import { breadcrumbReducer } from '@organism/TopAppBar';
import { pageViewerReducer } from '@template/PageViewer';

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
  breadcrumbReducer,
  pageViewerReducer
);

export default rootReducer;
