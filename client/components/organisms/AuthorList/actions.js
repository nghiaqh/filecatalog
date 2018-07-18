/*
 * action types
 */
export const REQUEST_AUTHORS = 'REQUEST_AUTHORS';
export const RECEIVE_AUTHORS = 'RECEIVE_AUTHORS';
export const REQUEST_AUTHOR_NUMBER = 'REQUEST_AUTHOR_NUMBER'
export const RECEIVE_AUTHOR_NUMBER = 'RECEIVE_AUTHOR_NUMBER';

/*
 * Sync action creators
 */
export const requestAuthors = (pageSize, pageNumber, filter, order) => ({
  type: REQUEST_AUTHORS,
  pageSize,
  pageNumber,
  filter,
  order
});

export const receiveAuthors = (json) => ({
  type: RECEIVE_AUTHORS,
  authors: json,
  receivedAt: Date.now()
});

export const requestAuthorNumber = (filter) => ({
  type: REQUEST_AUTHOR_NUMBER,
  filter: filter
});

export const receiveAuthorNumber = (json) => ({
  type: RECEIVE_AUTHOR_NUMBER,
  total: json.count,
  receivedAt: Date.now()
});

/**
 * Request a list of authors
 * @param {Integer} pageSize number of items per page
 * @param {Integer} pageNumber
 * @param {Object} filter { name: x } if defined, we will request only authors with name contains string x
 * @param {String} order mysql order input
 */
export const fetchAuthors = (pageSize = 12, pageNumber = 1, filter = {}, order = 'name') => {
  return (dispatch) => {
    dispatch(requestAuthors(pageSize, pageNumber, filter, order));
    const { name } = filter;

    const where = {};
    if (typeof name !== 'undefined' && name !== '') {
      where.name = {
        regexp: '.*' + name + '.*',
        options: 'i'
      }
    }

    const filterObj = {
      where: where,
      limit: pageSize,
      skip: pageSize * (pageNumber - 1),
      order: order
    };

    return fetch(`/api/authors?filter=${JSON.stringify(filterObj)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveAuthors(json)));
  };
};

/**
 * Request total number of authors
 * @param {filter} { name: x } if defined, we will request only authors with name contains string x
 */
export const countAuthors = (filter = {}) => {
  return (dispatch) => {
    dispatch(requestAuthorNumber(filter));

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
      .then(json => dispatch(receiveAuthorNumber(json)));
  };
};

/**
 * Use to determine if we need to call authors api again, using stored state
 */
export const fetchAuthorsIfNeeded = (pageSize, pageNumber, filter) => {
  return (dispatch, getState) => {
    const { authorList } = getState();
    const currentFilter = authorList.paginator.filter;
    if (typeof currentFilter.name === 'undefined') currentFilter.name = '';
    if (authorList.paginator.receivedItemsAt === null ||
      filter.name !== currentFilter.name) {
      dispatch(countAuthors(filter));
      dispatch(fetchAuthors(pageSize, pageNumber, filter));
    }
  }
}
