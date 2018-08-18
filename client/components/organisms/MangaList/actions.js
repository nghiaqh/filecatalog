import { normalize, schema } from 'normalizr';

const REQUEST_MANGAS = 'REQUEST_MANGAS';
const RECEIVE_MANGAS = 'RECEIVE_MANGAS';
const REQUEST_MANGA_NUMBER = 'REQUEST_MANGA_NUMBER'
const RECEIVE_MANGA_NUMBER = 'RECEIVE_MANGA_NUMBER';

function requestMangas(id, pageSize, pageNumber, filter, order) {
  return {
    type: REQUEST_MANGAS,
    id,
    pageSize,
    pageNumber,
    filter,
    order
  };
}

function receiveMangas(id, json) {
  const data = normalizeData(json);
  return {
    type: RECEIVE_MANGAS,
    id,
    items: data.result,
    entities: data.entities,
    receivedAt: Date.now()
  };
}

function requestMangaNumber(id, filter) {
  return {
    type: REQUEST_MANGA_NUMBER,
    id,
    filter
  };
}

function receiveMangaNumber(id, json) {
  return {
    type: RECEIVE_MANGA_NUMBER,
    id,
    total: json.count,
    receivedAt: Date.now()
  };
}

function setIsNew(json) {
  return json.map(item => {
    const now = new Date();
    const then = new Date(item.updated);
    item.isNew = (now - then) / (1000 * 3600 * 24) <= 14;
    return item;
  })
}

function normalizeData(json) {
  const data = setIsNew(json);

  const author = new schema.Entity('authors');
  const manga = new schema.Entity('mangas', {
    author: author
  });

  return normalize(data, [manga]);
}

/**
 * Call mangas api
 * @param {String} id
 * @param {Integer} pageSize number of items per page
 * @param {Integer} pageNumber
 * @param {Object} filter { title: x, author: y }
 * @param {String} order mysql order input
 */
function fetchMangas(
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'created DESC'
) {
  return (dispatch) => {
    dispatch(requestMangas(id, pageSize, pageNumber, filter, order));
    const { authorId, title } = filter;

    const where = authorId ? {authorId: authorId} : {};
    if (typeof title !== 'undefined' && title !== '') {
      where.title = {
        regexp: '.*' + title + '.*',
        options: 'i'
      }
    }

    const filterObj = {
      where: where,
      limit: pageSize,
      skip: pageSize * (pageNumber - 1),
      order: order,
      include: 'author'
    };

    return fetch(`/api/mangas?filter=${JSON.stringify(filterObj)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveMangas(id, json)));
  };
}

/**
 * Request total number of mangas
 * @param {String} id
 * @param {Object} filter { title: x, author: y }
 */
function countMangas(id, filter = {}) {
  return (dispatch) => {
    dispatch(requestMangaNumber(id, filter));

    const { authorId, title } = filter;
    const where = authorId ? {authorId: authorId} : {};
    if (typeof title !== 'undefined' && title !== '') {
      where.title = {
        regexp: '.*' + title + '.*',
        options: 'i'
      }
    }

    return fetch(`/api/mangas/count?where=${JSON.stringify(where)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveMangaNumber(id, json)));
  };
}

/**
 *
 * @param {String} id
 * @param {Integer} pageSize
 * @param {Integer} pageNumber
 * @param {Object} filter
 */
function loadMoreMangas(
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'created DESC'
) {
  return (dispatch, getState) => {
    const { withLoadMore } = getState();
    const data = withLoadMore[id];
    if (
      typeof data !== 'undefined'
      && data.filter.title === filter.title
      && data.filter.authorId === filter.authorId
      && data.pageNumber >= pageNumber
    ) {
      return;
    }

    dispatch(countMangas(id, filter));
    dispatch(fetchMangas(id, pageSize, pageNumber, filter, order));
  };
}

export {
  REQUEST_MANGAS,
  RECEIVE_MANGAS,
  REQUEST_MANGA_NUMBER,
  RECEIVE_MANGA_NUMBER,
  loadMoreMangas
}
