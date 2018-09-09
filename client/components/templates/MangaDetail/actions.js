/*
 * action types
 */
export const REQUEST_MANGA = 'REQUEST_MANGA';
export const RECEIVE_MANGA = 'RECEIVE_MANGA';
export const UPDATE_MANGA = 'UPDATE_MANGA';
export const DELETE_MANGA = 'DELETE_MANGA';
export const RECEIVE_UPDATE_MANGA_STATUS = 'RECEIVE_UPDATE_MANGA_STATUS';
export const RECEIVE_DELETE_MANGA_STATUS = 'RECEIVE_DELETE_MANGA_STATUS';

/*
 * Sync action creators
 */
const requestManga = (id) => ({
  type: REQUEST_MANGA,
  id
});

const receiveManga = (json) => ({
  type: RECEIVE_MANGA,
  manga: json[0],
  receivedAt: Date.now()
});

const sendUpdateManga = (manga) => ({
  type: UPDATE_MANGA,
  manga
});

const sendDeleteManga = (id) => ({
  type: DELETE_MANGA,
  id
});

const receiveUpdateStatus = (json) => ({
  type: RECEIVE_UPDATE_MANGA_STATUS,
  manga: json,
  receivedAt: Date.now()
});

const receiveDeleteStatus = (json) => ({
  type: RECEIVE_DELETE_MANGA_STATUS,
  message: json,
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
    const { mangas } = getState().entities;
    if (typeof mangas === 'undefined' || typeof mangas[id] === 'undefined') {
      dispatch(fetchManga(id));
    }
  }
}

export const updateManga = (manga) => {
  return (dispatch) => {
    dispatch(sendUpdateManga(manga));
    return fetch(`/api/mangas/${manga.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(manga)
    })
    .then(res => res.json())
    .then(json => dispatch(receiveUpdateStatus(json)));
  }
}
