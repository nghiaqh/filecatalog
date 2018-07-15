import themes from './themes';
import { SET_THEME } from './actions';

const initialState = {
  themes: themes,
  enabledTheme: Object.keys(themes)[0]
};

export default (prevState, action) => {
  const state = Object.assign({}, initialState, prevState);
  if (action.type === SET_THEME) {
    return {
      ...state,
      enabledTheme: action.theme
    };
  }
  return state;
}
