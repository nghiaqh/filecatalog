import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '@client/reducers';
import ReactApp from '@client/App';
import Html from './template';


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

export default renderPage;
