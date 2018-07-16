import { SET_BREADCRUMB } from './actions';
const initialState = {
  breadcrumb: {
    0: {
      text: 'Home',
      url: '/'
    }
  }
}

const breadcrumbReducer = (prevState = {}, action) => {
  const state = Object.assign({}, initialState, prevState);
  if (action.type === SET_BREADCRUMB) {
    const breadcrumb = {
      0: {
        text: 'Home',
        url: '/'
      }
    };
    const pathname = action.pathname;

    if (pathname !== '/') {
      const parts = pathname.split('/').splice(1);
      const type = parts[0];
      const id = parts[1];
      const nameOrTitle = type === 'mangas' ? 'title' : 'name';

      parts.forEach((item, index) => {
        breadcrumb[index + 1] = {
          text: index === 0 ? item : state[type][id][nameOrTitle],
          url: index === 0 ? `/${item}` : '#'
        };
      });
    }

    return {
      ...state,
      breadcrumb
    }
  } else {
    return state;
  }
}

export default breadcrumbReducer;
