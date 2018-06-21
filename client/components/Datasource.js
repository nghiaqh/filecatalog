const ITEM_PER_PAGE = 12;

const fetchItems = (api, filter = {}, skip = 0, limit = ITEM_PER_PAGE) => {
  const filterObj = Object.assign({
    limit: limit,
    skip: skip < 0 ? 0 : skip
  }, filter);

  return fetch(`${api}?filter=${JSON.stringify(filterObj)}`)
    .then(res => res.json());
};

const countItems = (api, where = null) => {
  let url = `${api}/count`;
  if (where !== null) {
    url += '?where=' + JSON.stringify(where);
  }

  return fetch(url).then(res => res.json());
};

export { fetchItems, countItems };
