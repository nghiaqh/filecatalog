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
        const text = index === 1 ? state.entities[type][id][nameOrTitle] : item;
        const url = index === parts.length - 1
          ? '#'
          : `/${parts.slice(0, index + 1).join('/')}`;
        breadcrumb[index + 1] = {
          text,
          url
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
