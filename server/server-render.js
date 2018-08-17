import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../client/reducers';
import ReactApp from '../client/App';
import Html from '../client/components/templates/Html';

module.exports = (app) => {
  const Author = app.models.Author;
  const Genre = app.models.Genre;
  const Manga = app.models.Manga;
  const Page = app.models.Page;
  const Series = app.models.Series;

  app.get(['/', '/mangas'], (req, res) => {
    preloadMangas(Manga)
      .then(state => renderPage(req, res, state));
  });
  app.get('/mangas/:id', (req, res) => {
    preloadManga(Manga, parseInt(req.params.id), Page)
      .then(state => renderPage(req, res, state));
  });
  app.get('/authors', (req, res) => {
    preloadAuthors(Author)
     .then(state => renderPage(req, res, state));
  });
  app.get('/authors/:id', (req, res) => {
    preloadAuthor(Author, parseInt(req.params.id), Manga)
      .then(state => renderPage(req, res, state));
  });
}

function renderPage(req, res, preloadedState) {
  const middleware = [ thunk ];
  const finalState = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware))
    .getState();
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  const context = {};
  let application = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <ReactApp/>
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    const html = Html({
      title: 'File Catalog',
      body: application,
      preloadedState: finalState
    });
    res.send(html);
  }
}

async function preloadMangas(Manga) {
  const m = await getFirstPage(Manga, 20, {}, 'created DESC', 'author');

  return {
    mangaList: m.list,
    mangas: m.entities
  };
}

async function preloadManga(Manga, id, Page) {
  const m = await getFirstPage(Manga, 1, { id: id });
  const p = await getFirstPage(Page, 20, { mangaId: id }, 'title');

  return {
    pageList: p.list,
    pages: p.entities,
    mangas: m.entities
  };
}

async function preloadAuthors(Author) {
  const a = await getFirstPage(Author, 20, {}, 'name');

  return {
    authorList: a.list,
    authors: a.entities,
  };
}

async function preloadAuthor(Author, id, Manga) {
  const a = await getFirstPage(Author, 1, { id: id });
  const m = await getFirstPage(Manga, 20, { authorId: id }, 'created DESC', 'author');

  return {
    mangaList: m.list,
    authors: a.entities,
    mangas: m.entities
  };
}

async function getFirstPage(Model, pageSize, filter, order, include) {
  const list = {
    display: {
      type: 'grid'
    },
    paginator: {
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
    }
  };

  list.paginator.total = await Model.count(filter);

  const result = await Model.find({
    where: filter,
    limit: pageSize,
    include: include,
    order: order
  });

  const entities = {};
  result.forEach(item => {
    list.paginator.items.push(item.id);
    entities[item.id] = item;
  });

  return { list, entities };
}
