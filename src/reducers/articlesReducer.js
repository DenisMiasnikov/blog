/* eslint-disable indent */
/* eslint-disable default-param-last */
const articleReducer = (
  state = {
    globalArticles: [],
    anArticle: [],
    actualPage: 1,
    totalPage: 0,
  },
  action
) => {
  switch (action.type) {
    case 'GET_GLOBAL_ARTICLES':
      return {
        ...state,
        globalArticles: action.articles,
        totalPage: action.totalPage,
      };
    case 'CHANGE_ACTUAL_PAGE':
      return {
        ...state,
        actualPage: action.payload,
      };
    case 'GET_AN_ARTICLE':
      return {
        ...state,
        anArticle: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
