
export function getNestedObject(nestedObj, path) {
  if (!Array.isArray(path)) return null;
  return path.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : undefined,
    nestedObj
  );
}

export function isNewItem(item) {
  const now = new Date();
  const then = new Date(item.updated);
  return (now - then) / (1000 * 3600 * 24) <= 10;
}
