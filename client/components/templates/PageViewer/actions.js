import { normalize, schema } from 'normalizr';

const REQUEST_PAGES = 'REQUEST_PAGES';
const RECEIVE_PAGES = 'RECEIVE_PAGES';
const REQUEST_PAGE_NUMBER = 'REQUEST_PAGE_NUMBER'
const RECEIVE_PAGE_NUMBER = 'RECEIVE_PAGE_NUMBER';

/*
 * Sync action creators
 */
function requestPages(id, pageSize, pageNumber, filter, order, reducer) {
  return {
    type: REQUEST_PAGES,
    id,
    pageSize,
    pageNumber,
    filter,
    order,
    reducer
  };
}

function receivePages(id, json, reducer) {
  const data = normalizeData(json);
  return {
    type: RECEIVE_PAGES,
    id,
    items: data.result,
    entities: data.entities,
    receivedAt: Date.now(),
    reducer
  };
}

function requestPageNumber(id, filter, reducer) {
  return {
    type: REQUEST_PAGE_NUMBER,
    id,
    filter,
    reducer
  };
}

function receivePageNumber(id, json, reducer) {
  return {
    type: RECEIVE_PAGE_NUMBER,
    id,
    total: json.count,
    receivedAt: Date.now(),
    reducer
  };
}

function normalizeData(json) {
  const page = new schema.Entity('pages');
  return normalize(json, [page]);
}

/**
 * Request manga pages
 * @param {Integer} pageSize number of item to request
 * @param {Integer} pageNumber
 * @param {Object} filter {manga} if defined, we will only request pages of this manga
 * @param {String} order mysql order
 */
function fetchPages(
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'number',
  reducer
) {
  return (dispatch) => {
    dispatch(requestPages(id, pageSize, pageNumber, filter, order, reducer));
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
      .then(json => dispatch(receivePages(id, json, reducer)));
  };
}

/**
 * Request total number of pages
 * @param {filter} {manga} if defined, we will only request pages of this manga
 */
function countPages(id, filter = {}, reducer) {
  return (dispatch) => {
    dispatch(requestPageNumber(id, filter, reducer));

    const { mangaId } = filter;
    const where = mangaId ? {mangaId: mangaId} : {};

    return fetch(`/api/pages/count?where=${JSON.stringify(where)}`)
      .then(res => res.json())
      .then(json => dispatch(receivePageNumber(id, json, reducer)));
  };
}

function paginatePages(
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'number'
) {
  return (dispatch, getState) => {
    const { withPagination } = getState();
    const data = withPagination[id];
    if (
      typeof data !== 'undefined'
      && data.filter.mangaId === filter.mangaId
      && data.pageNumber === pageNumber
    ) {
      return;
    }

    const reducer = 'WITH_PAGINATION';
    dispatch(countPages(id, filter, reducer));
    dispatch(fetchPages(id, pageSize, pageNumber, filter, order, reducer));
  };
}

export {
  REQUEST_PAGES,
  RECEIVE_PAGES,
  REQUEST_PAGE_NUMBER,
  RECEIVE_PAGE_NUMBER,
  paginatePages
}
