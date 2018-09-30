import { getAuthors } from '../api/authors';
async function getFirstPage(Model, pageSize, filter, order, include) {
  const list = {
    items: [],
    total: 0,
    pageNumber: 1,
    pageSize: pageSize,
    order: order,
    filter: filter,
    retrievingItems: false,
    retrievingTotal: false,
    receivedItemsAt: new Date(),
    receivedTotalAt: new Date(),
  };

  list.total = await Model.count(filter);
  let data = [];
  let items;

  const conditions = {
    where: filter,
    limit: pageSize,
    include: include,
    order: order
  };

  switch (Model.name) {
    case 'Author':
      data = await getAuthors(conditions);
      break;
    default:
      const items = await Model.find(conditions);
      data = items.map(item => item.__data);
      break;
  }

  list.items = data.map(item => item.id);

  return { list, data };
}

export default getFirstPage;
