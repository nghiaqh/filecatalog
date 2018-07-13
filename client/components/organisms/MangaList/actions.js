/*
 * action types
 */
export const REQUEST_MANGAS = 'REQUEST_MANGAS';
export const RECEIVE_MANGAS = 'RECEIVE_MANGAS';
export const REQUEST_MANGA_NUMBER = 'REQUEST_MANGA_NUMBER'
export const RECEIVE_MANGA_NUMBER = 'RECEIVE_MANGA_NUMBER';

/*
 * Sync action creators
 */
export const requestMangas = (pageSize, pageNumber, filter, order) => ({
  type: REQUEST_MANGAS,
  pageSize,
  pageNumber,
  filter,
  order
});

export const receiveMangas = (json) => ({
  type: RECEIVE_MANGAS,
  mangas: json,
  receivedAt: Date.now()
});

export const requestMangaNumber = (filter) => ({
  type: REQUEST_MANGA_NUMBER,
  filter: filter
});

export const receiveMangaNumber = (json) => ({
  type: RECEIVE_MANGA_NUMBER,
  total: json.count,
  receivedAt: Date.now()
});

/**
 * Request a list of mangas
 * @param {Integer} pageSize number of items per page
 * @param {Integer} pageNumber
 * @param {Object} filter { title: x, author: y } if defined, we will request only mangas with title contains string x and written by the author y
 * @param {String} order mysql order input
 */
export const fetchMangas = (pageSize = 12, pageNumber = 1, filter = {}, order = 'created DESC') => {
  return (dispatch) => {
    dispatch(requestMangas(pageSize, pageNumber, filter, order));
    const { author, title } = filter;

    const where = author ? {authorId: author.id} : {};
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
      .then(json => dispatch(receiveMangas(json)));
  };
};

/**
 * Request total number of mangas
 * @param {filter} { title: x, author: y } if defined, we will request only mangas with title contains string x and written by the author y
 */
export const countMangas = (filter = {}) => {
  return (dispatch) => {
    dispatch(requestMangaNumber(filter));

    const { author, title } = filter;
    const where = author ? {authorId: author.id} : {};
    if (typeof title !== 'undefined' && title !== '') {
      where.title = {
        regexp: '.*' + title + '.*',
        options: 'i'
      }
    }

    return fetch(`/api/mangas/count?where=${JSON.stringify(where)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveMangaNumber(json)));
  };
};

/**
 * Use to determine if we need to call mangas api again, using stored state
 */
export const fetchMangasIfNeeded = (pageSize, pageNumber, filter) => {
  return (dispatch, getState) => {
    const { mangaList } = getState();
    if (mangaList.paginator.receivedItemsAt === null ||
      filter !== mangaList.paginator.filter) {
      dispatch(countMangas(filter));
      dispatch(fetchMangas(pageSize, pageNumber, filter));
    }
  }
}
