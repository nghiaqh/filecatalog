import { normalize, schema } from 'normalizr';

const REQUEST_AUTHORS = 'REQUEST_AUTHORS';
const RECEIVE_AUTHORS = 'RECEIVE_AUTHORS';
const REQUEST_AUTHOR_NUMBER = 'REQUEST_AUTHOR_NUMBER'
const RECEIVE_AUTHOR_NUMBER = 'RECEIVE_AUTHOR_NUMBER';

function requestAuthors(id, pageSize, pageNumber, filter, order) {
  return {
    type: REQUEST_AUTHORS,
    id,
    pageSize,
    pageNumber,
    filter,
    order
  };
}

function receiveAuthors(id, json) {
  const data = normalizeData(json);
  return {
    type: RECEIVE_AUTHORS,
    id,
    items: data.result,
    entities: data.entities,
    receivedAt: Date.now()
  };
}

function requestAuthorNumber(id, filter) {
  return {
    type: REQUEST_AUTHOR_NUMBER,
    id,
    filter
  };
}

function receiveAuthorNumber(id, json) {
  return {
    type: RECEIVE_AUTHOR_NUMBER,
    id,
    total: json.count,
    receivedAt: Date.now()
  };
}

function normalizeData(json) {
  const author = new schema.Entity('authors');
  return normalize(json, [author]);
}

/**
 * Request a list of authors
 * @param {String} id
 * @param {Integer} pageSize number of items per page
 * @param {Integer} pageNumber
 * @param {Object} filter { name: x }
 * @param {String} order mysql order input
 */
function fetchAuthors(
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'name'
) {
  return (dispatch) => {
    dispatch(requestAuthors(id, pageSize, pageNumber, filter, order));
    const { name } = filter;

    const where = {};
    if (typeof name !== 'undefined' && name !== '') {
      where.name = {
        regexp: '.*' + name + '.*',
        // options: 'i'
      }
    }

    const filterObj = {
      where: where,
      limit: pageSize,
      skip: pageSize * (pageNumber - 1),
      order: order
    };

    return fetch(`/api/v2/authors?filter=${JSON.stringify(filterObj)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveAuthors(id, json)));
  };
}

/**
 * Request total number of authors
 * @param {String} id
 * @param {filter} { name: x }
 */
function countAuthors(id, filter = {}) {
  return (dispatch) => {
    dispatch(requestAuthorNumber(id, filter));

    const { name } = filter;
    const where = {};
    if (typeof name !== 'undefined' && name !== '') {
      where.name = {
        regexp: '.*' + name + '.*',
        options: 'i'
      }
    }

    return fetch(`/api/authors/count?where=${JSON.stringify(where)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveAuthorNumber(id, json)));
  };
}

/**
 *
 * @param {String} id
 * @param {Integer} pageSize
 * @param {Integer} pageNumber
 * @param {Object} filter
 */
function loadMoreAuthors(
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'name'
) {
  return (dispatch, getState) => {
    const { withLoadMore } = getState();
    const data = withLoadMore[id];
    if (
      typeof data !== 'undefined'
      && data.filter.name === filter.name
      && data.pageNumber >= pageNumber
    ) {
      return;
    }

    dispatch(countAuthors(id, filter));
    dispatch(fetchAuthors(id, pageSize, pageNumber, filter, order));
  };
}

export {
  REQUEST_AUTHORS,
  RECEIVE_AUTHORS,
  REQUEST_AUTHOR_NUMBER,
  RECEIVE_AUTHOR_NUMBER,
  loadMoreAuthors
}
