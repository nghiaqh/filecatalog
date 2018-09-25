import getFirstPage from './preload-state';

async function preloadAuthors(Author) {
  const a = await getFirstPage(Author, 48, {}, 'name');

  return {
    withLoadMore: {
      [`author-list-author-hub`]: a.list
    },
    entities: {
      authors: a.entities,
    }
  };
}

async function preloadAuthor(Author, id, Manga) {
  const a = await getFirstPage(Author, 1, { id: id });
  const m = await getFirstPage(Manga, 48, { authorId: id }, 'created DESC', 'author');

  return {
    withLoadMore: {
      [`manga-list-author-${id}`]: m.list
    },
    entities: {
      authors: a.entities,
      mangas: m.entities
    }
  };
}

export {
  preloadAuthor,
  preloadAuthors
};
