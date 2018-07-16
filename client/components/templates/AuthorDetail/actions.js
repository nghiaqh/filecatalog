/*
 * action types
 */
export const REQUEST_AUTHOR = 'REQUEST_AUTHOR';
export const RECEIVE_AUTHOR = 'RECEIVE_AUTHOR';

/*
 * Sync action creators
 */
export const requestAuthor = (id) => ({
  type: REQUEST_AUTHOR,
  id
});

export const receiveAuthor = (json) => ({
  type: RECEIVE_AUTHOR,
  author: json[0],
  receivedAt: Date.now()
});

/**
 * Request a author by ID
 * @param {String} id
 */
export const fetchAuthor = (id) => {
  return (dispatch) => {
    dispatch(requestAuthor(id));

    const filterObj = {
      where: { id: id }
    };

    return fetch(`/api/authors?filter=${JSON.stringify(filterObj)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveAuthor(json)));
  };
};

/**
 * Use to determine if we need to call authors api again, using stored state
 */
export const fetchAuthorIfNeeded = (id) => {
  return (dispatch, getState) => {
    const { authors } = getState();
    if (typeof authors === 'undefined' || typeof authors[id] === 'undefined') {
      dispatch(fetchAuthor(id));
    }
  }
}
