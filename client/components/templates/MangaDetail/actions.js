/*
 * action types
 */
export const REQUEST_MANGA = 'REQUEST_MANGA';
export const RECEIVE_MANGA = 'RECEIVE_MANGA';

/*
 * Sync action creators
 */
export const requestManga = (id) => ({
  type: REQUEST_MANGA,
  id
});

export const receiveManga = (json) => ({
  type: RECEIVE_MANGA,
  manga: json,
  receivedAt: Date.now()
});

/**
 * Request a manga by ID
 * @param {String} id
 */
export const fetchManga = (id) => {
  return (dispatch) => {
    dispatch(requestManga(id));

    const filterObj = {
      where: { id: id },
      include: 'author'
    };

    return fetch(`/api/mangas?filter=${JSON.stringify(filterObj)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveManga(json)));
  };
};

/**
 * Use to determine if we need to call mangas api again, using stored state
 */
export const fetchMangaIfNeeded = (id) => {
  return (dispatch, getState) => {
    const { entities } = getState();
    if (typeof entities.mangas === 'undefined' ||
      typeof entities.mangas[id] === 'undefined') {
      dispatch(fetchManga(id));
    }
  }
}
