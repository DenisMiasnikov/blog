/* eslint-disable indent */
/* eslint-disable default-param-last */
const loginReducer = (
  state = {
    isLogged: false,
    user: [],
    updated: false,
  },
  action
) => {
  switch (action.type) {
    case 'USER_LOG_IN':
      return {
        isLogged: true,
        user: action.payload,
      };
    case 'USER_LOG_OUT':
      return {
        isLogged: false,
        user: [],
      };
    case 'SET_ERROR':
      return {
        ...state,
        updated: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
