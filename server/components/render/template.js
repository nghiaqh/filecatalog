export default ({ body, title, preloadedState, css }) => `
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${title}</title>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link href="/public/material-components-web.min.css" rel="stylesheet">

      ${css ? `<style>${css}</style>` : ''}
  </head>

  <body>
      <div id="root">${body}</div>
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script type="text/javascript" src="/public/bundle.js"></script>
  </body>

  </html>
`;
