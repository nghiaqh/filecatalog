async function getFirstPage(Model, pageSize, filter, order, include) {
  const list = {
    items: [],
    total: 0,
    pageNumber: 1,
    pageSize: pageSize,
    order: order,
    filter: filter,
    retrievingItems: true,
    retrievingTotal: true,
    receivedItemsAt: new Date(),
    receivedTotalAt: new Date(),
  };

  list.total = await Model.count(filter);

  const result = await Model.find({
    where: filter,
    limit: pageSize,
    include: include,
    order: order
  });

  const entities = {};
  result.forEach(item => {
    list.items.push(item.id);
    entities[item.id] = item;
  });

  return { list, entities };
}

export default getFirstPage;
