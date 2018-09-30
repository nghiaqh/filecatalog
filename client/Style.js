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
  }

  /* Animation */
  .fade-enter,
  .fade-appear {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active,
  .fade-appear.fade-appear-active {
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

  .spin {
    animation-name: spin;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  }
`;
