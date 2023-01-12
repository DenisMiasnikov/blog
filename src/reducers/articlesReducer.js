/* eslint-disable indent */
/* eslint-disable default-param-last */
const articleReducer = (
  state = {
    globalArticles: [],
    anArticle: [],
    actualPage: 1,
    totalPage: 0,
    loading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case 'GET_GLOBAL_ARTICLES':
      return {
        ...state,
        globalArticles: action.articles,
        totalPage: action.totalPage,
        loading: false,
        error: false,
      };
    case 'CHANGE_ACTUAL_PAGE':
      return {
        ...state,
        actualPage: action.payload,
        error: false,
      };
    case 'GET_AN_ARTICLE':
      return {
        ...state,
        anArticle: action.payload,
        loading: false,
        error: false,
      };
    case 'START_TO_FETCH':
      return {
        ...state,
        loading: true,
      };
    case 'GET_AN_ERROR':
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default articleReducer;
