import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import articlesReducer from './articlesReducer';

export default combineReducers({
  loginReducer,
  articlesReducer,
});
