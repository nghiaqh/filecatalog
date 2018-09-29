import { SET_BREADCRUMB } from './actions';
const initialState = {
  breadcrumb: [{
    text: 'Home',
    url: '/'
  }]
}

const breadcrumbReducer = (prevState = {}, action) => {
  const state = Object.assign({}, initialState, prevState);
  if (action.type === SET_BREADCRUMB) {
    const breadcrumb = createBreadcrumb(state, action.pathname);

    return {
      ...state,
      breadcrumb
    }
  } else {
    return state;
  }
}

function createBreadcrumb(state, pathname) {
  let { breadcrumb } = initialState;
  const parts = pathname.split('/').splice(1);

  if (pathname !== '/') {
    const type = parts[0];
    const id = parts[1];
    const nameOrTitle = type === 'mangas' ? 'title' : 'name';

    const trails = parts.map((item, index) => {
      const text = index === 1 ? state.entities[type][id][nameOrTitle] : item;
      const url = index === parts.length - 1
        ? '#'
        : `/${parts.slice(0, index + 1).join('/')}`;
      const visibleOnCompactMode =
        (parts.length === 1 && index === 0) ||
        (parts.length > 1 && index === 1);

      return {
          text,
          url,
          visibleOnCompactMode
      };
    });

    breadcrumb = breadcrumb.concat(trails);
  }

  return breadcrumb;
}

export default breadcrumbReducer;
