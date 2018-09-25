import { schema } from 'normalizr';

const author = new schema.Entity('authors');
const manga = new schema.Entity('mangas', {
  author: author
});
const page = new schema.Entity('pages');

export {
  author,
  manga,
  page
}
