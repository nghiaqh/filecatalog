import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import ReactApp from '../client/App';
import Html from '../client/components/templates/Html';

const routes = [
  '/',
  '/mangas',
  '/mangas/:mangaId',
];

module.exports = (app) => app.get(routes, (req, res) => {
  const context = {};
  let application = renderToString(
    <StaticRouter location={req.url} context={context}>
      <ReactApp/>
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    const html = Html({title: 'File Catalog', body: application});
    res.send(html);
  }
});
