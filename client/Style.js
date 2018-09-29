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

  .no-scroll {
    overflow: hidden;
    @media (min-device-width: 1025px) {
      padding-right: 15px;
    }
  }

  /* Animation */
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity .5s ease-in;
  }

  .fade-leave {
    opacity: 1;
  }

  .fade-leave.fade-leave-active {
    opacity: 0.01;
    transition: opacity .3s ease-in;
  }
`;
