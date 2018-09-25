import { normalize } from 'normalizr';
import getFirstPage from './preload-state';
import { manga, page } from './schemas';

async function preloadMangas(Manga) {
  const m = await getFirstPage(Manga, 48, {}, 'created DESC', 'author');

  // initialise filter so loadMore action doesn't trigger
  m.list.filter = { title: '' };

  m.data.forEach(manga => {
    manga.author = manga.author.__data
  });

  const { entities } = normalize(m.data, [manga]);

  return {
    withLoadMore: {
      [`manga-list-manga-hub`]: m.list
    },
    entities
  };
}

async function preloadManga(Manga, id, Page) {
  const m = await getFirstPage(Manga, 1, { id: id }, 'created DESC', 'author');
  const p = await getFirstPage(Page, 24, { mangaId: id }, 'title');
  m.data.forEach(manga => {
    manga.author = manga.author.__data
  });
  const nm = normalize(m.data, [manga]);
  const np = normalize(p.data, [page]);

  return {
    withLoadMore: {
      [`page-list-manga-${id}`]: p.list
    },
    entities: Object.assign({}, nm.entities, np.entities)
  };
}

export {
  preloadManga,
  preloadMangas
};
