const ITEM_PER_PAGE = 12;

const fetchItems = (api, where = {}, skip = 0, limit = ITEM_PER_PAGE) => {
  const filter = {
    limit: limit,
    skip: skip < 0 ? 0 : skip,
    where: where
  };

  return fetch(`${api}?filter=${JSON.stringify(filter)}`)
    .then(res => res.json());
};

const countItems = (api, property = null, value = null) => {
  let url = `${api}/count`;
  if (property !== null) {
    url += `?where[${property}]=${value}`
  }

  return fetch(url).then(res => res.json());
};

export { fetchItems, countItems };
