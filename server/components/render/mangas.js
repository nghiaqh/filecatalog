import getFirstPage from './preload-state';

async function preloadMangas(Manga) {
  const m = await getFirstPage(Manga, 20, {}, 'created DESC', 'author');

  return {
    withLoadMore: {
      [`manga-list-manga-hub`]: m.list
    },
    entities: {
      mangas: m.entities
    }
  };
}

async function preloadManga(Manga, id, Page) {
  const m = await getFirstPage(Manga, 1, { id: id });
  const p = await getFirstPage(Page, 24, { mangaId: id }, 'title');

  return {
    withLoadMore: {
      [`page-list-manga-${id}`]: p.list
    },
    entities: {
      mangas: m.entities,
      pages: p.entities
    }
  };
}

export {
  preloadManga,
  preloadMangas
};
