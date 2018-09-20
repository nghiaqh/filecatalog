import { preloadMangas, preloadManga } from './mangas';
import { preloadAuthors, preloadAuthor } from './authors';
import renderPage from './render-page';

export default (app) => {
  const Author = app.models.Author;
  const Genre = app.models.Genre;
  const Manga = app.models.Manga;
  const Page = app.models.Page;
  const Series = app.models.Series;

  app.get(['/', '/mangas'], (req, res) =>
    preloadMangas(Manga)
      .then(state => renderPage(req, res, state))
  );
  app.get('/mangas/:id', (req, res) =>
    preloadManga(Manga, parseInt(req.params.id), Page)
      .then(state => renderPage(req, res, state))
  );
  app.get('/authors', (req, res) =>
    preloadAuthors(Author)
     .then(state => renderPage(req, res, state))
  );
  app.get('/authors/:id', (req, res) =>
    preloadAuthor(Author, parseInt(req.params.id), Manga)
      .then(state => renderPage(req, res, state))
  );
  app.get('/mangas/:id/:pageNumber', (req, res) =>
    preloadManga(Manga, parseInt(req.params.id), Page)
      .then(state => renderPage(req, res, state))
  );
}
