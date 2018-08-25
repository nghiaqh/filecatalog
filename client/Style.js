import { injectGlobal } from 'emotion';

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    margin: 0;
    overflow-x: hidden;
  }

  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;

    &:hover {
      text-overflow: unset;
      width: fit-content;
      white-space: normal;
    }
  }

  a {
    text-decoration: none;
  }

  .mdc-button:not(:disabled) {
    color: var(--mdc-theme-text-primary-on-background);
  }
`;
