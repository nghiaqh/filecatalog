/*
 * action types
 */
export const REQUEST_PAGES = 'REQUEST_PAGES';
export const RECEIVE_PAGES = 'RECEIVE_PAGES';
export const REQUEST_PAGE_NUMBER = 'REQUEST_PAGE_NUMBER'
export const RECEIVE_PAGE_NUMBER = 'RECEIVE_PAGE_NUMBER';
export const CHANGE_DISPLAY = 'CHANGE_DISPLAY';

/*
 * Sync action creators
 */
export const requestPages = (pageSize, pageNumber, filter, order) => ({
  type: REQUEST_PAGES,
  pageSize,
  pageNumber,
  filter,
  order
});

export const receivePages = (json) => ({
  type: RECEIVE_PAGES,
  pages: json,
  receivedAt: Date.now()
});

export const requestPageNumber = (filter) => ({
  type: REQUEST_PAGE_NUMBER,
  filter: filter
});

export const receivePageNumber = (json) => ({
  type: RECEIVE_PAGE_NUMBER,
  total: json.count,
  receivedAt: Date.now()
});

/**
 * Request manga pages
 * @param {Integer} pageSize number of item to request
 * @param {Integer} pageNumber
 * @param {Object} filter {manga} if defined, we will only request pages of this manga
 * @param {String} order mysql order
 */
export const fetchPages = (pageSize = 12, pageNumber = 1, filter = {}, order = 'title') => {
  return (dispatch) => {
    dispatch(requestPages(pageSize, pageNumber, filter, order));
    const { mangaId } = filter;
    const where = mangaId ? { mangaId: mangaId } : {};
    const filterObj = {
      where: where,
      limit: pageSize,
      skip: pageSize * (pageNumber - 1),
      order: order
    };
    return fetch(`/api/pages?filter=${JSON.stringify(filterObj)}`)
      .then(res => res.json())
      .then(json => dispatch(receivePages(json)));
  }
};

/**
 * Request total number of pages
 * @param {filter} {manga} if defined, we will only request pages of this manga
 */
export const countPages = (filter = {}) => {
  return (dispatch) => {
    dispatch(requestPageNumber(filter));

    const { mangaId } = filter;
    const where = mangaId ? {mangaId: mangaId} : {};

    return fetch(`/api/pages/count?where=${JSON.stringify(where)}`)
      .then(res => res.json())
      .then(json => dispatch(receivePageNumber(json)));
  };
};

/**
 * Use to determine if we need to call mangas api again, using stored state
 */
export const fetchPagesIfNeeded = (pageSize, pageNumber, filter) => {
  return (dispatch, getState) => {
    const { pageList } = getState();
    if (pageList.paginator.receivedItemsAt === null ||
      filter.mangaId !== pageList.paginator.filter.mangaId) {
      dispatch(countPages(filter));
      dispatch(fetchPages(pageSize, pageNumber, filter));
    }
  }
};

export const changeDisplay = (display, pageSize, pageNumber, filter) => ({
  type: CHANGE_DISPLAY,
  display,
  pageSize,
  pageNumber,
  filter
});
