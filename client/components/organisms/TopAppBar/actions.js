export const SET_BREADCRUMB = 'SET_BREADCRUMB';

export const setBreadcrumb = (pathname) => {
  return {
    type: SET_BREADCRUMB,
    pathname
  };
};
