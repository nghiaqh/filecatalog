import { normalize } from 'normalizr';
import getFirstPage from './preload-state';
import { author, manga } from './schemas';

async function preloadAuthors(Author) {
  const a = await getFirstPage(Author, 48, {}, 'name');

  // initialise filter so loadMore action doesn't trigger
  a.list.filter = { name: '' };

  const { entities } = normalize(a.data, [author]);

  const searchList = Object.assign({}, a.list);
  searchList.items = searchList.items.slice(0, 12);

  return {
    withLoadMore: {
      [`author-list-author-hub`]: a.list,
      [`author-list-search`]: searchList
    },
    entities
  };
}

async function preloadAuthor(Author, id, Manga) {
  const m = await getFirstPage(Manga, 48, { authorId: id }, 'created DESC', 'author');
  m.data.forEach(manga => {
    manga.author = manga.author.__data
  });

  const { entities } = normalize(m.data, [manga]);

  return {
    withLoadMore: {
      [`manga-list-author-${id}`]: m.list
    },
    entities
  };
}

export {
  preloadAuthor,
  preloadAuthors
};
