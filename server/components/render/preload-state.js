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

  const result = await Model.find({
    where: filter,
    limit: pageSize,
    include: include,
    order: order
  });

  result.forEach(item => {
    list.items.push(item.id);
  });

  const data = result.map(item => item.__data);

  return { list, data };
}

export default getFirstPage;
