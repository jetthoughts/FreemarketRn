import { combineReducers } from 'redux';

import categories from './categories';
import products from './products';
import user from './user';

const rootReducer = combineReducers({
  categories,
  products,
  user,
});

export default rootReducer;
