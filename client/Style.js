import { injectGlobal } from 'emotion';

injectGlobal`

  /* Reset global styles */

  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    margin: 0;
  }

  a {
    text-decoration: none;
  }


  /* Material overwrite */

  .mdc-button:not(:disabled) {
    color: var(--mdc-theme-text-primary-on-background);
  }


  /* Utility classes */

  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
  }

  .text-center {
    text-align: center;
  }
`;
