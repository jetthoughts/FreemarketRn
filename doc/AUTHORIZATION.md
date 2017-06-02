# Authorization in React Native

## Basics

In order to acomplish authorization on client we should implement it on backend
first.

Let's assume that we have the REST HTTP API which checks request headers and
respond with 401 (Unauthorized) or 405 (Method Not Allowed) status for private
part of API that does not allow user to attend (or if user is not authenticated
beforehand).

```
$ curl -I https://freemarketrn.firebaseio.com/categories.json

HTTP/1.1 405 Method Not Allowed
...
...
Strict-Transport-Security: max-age=31556926; includeSubDomains; preload
```

One possible way to handle this on UI is to show an Sign In form for User
to fill in; in our case we have chosen
[react-native-router-flux](https://www.npmjs.com/package/react-native-router-flux) for scenes management so we can create scene for Sign In:

```javascript
// app/scenes/SignIn.js

import { connect } from 'react-redux';

import { requestSignIn } from '../reducers/user';
import SignInForm from '../components/SignInForm';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch(requestSignIn(payload)),
});

export default connect(undefined, mapDispatchToProps)(SignInForm);
```

_Authenticating and form building are out of scope for this particular doc_

For state management we are using [redux](https://www.npmjs.com/package/redux) (with sugar like [redux-act](https://www.npmjs.com/package/redux-act)),
so we should be able to define user state:

```javascript
// app/reducers/user.js

import { createAction, createReducer } from 'redux-act';

export const requestSignIn = createAction('Send Sign In request to API');
export const signInSuccess = createAction('Successfully Signed In to API');
export const signInFailure = createAction('Failed to Signing In to API');

const initialUserState = {
  completed: true,
  record: {},
  error: null,
};
const user = createReducer({
  [requestSignIn]: state => ({ ...state, completed: false }),
  [signInSuccess]: (state, record) => ({ ...state, record, completed: true }),
  [signInFailure]: (state, error) => ({ ...state, error, completed: true }),
}, initialUserState);

export default user;
```

Next step would be to glue this all together. We will use [redux-saga](https://www.npmjs.com/package/redux-saga) for this purpose:

```javascript
// app/sagas/categories.js

import { put, call, takeLatest } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';

import {
  categoriesSuccess,
  categoriesError,
  requestCategories,
} from '../reducers/categories';

import { fetchAllCategories } from '../api/rest';
import {
  objectWithRecordsToArray,
  isUnauthorizedError,
} from './util';

export function* fetchCategories() {
  try {
	const { data } = yield call(fetchAllCategories);
	const categories = objectWithRecordsToArray(data);
	yield put(categoriesSuccess(categories));
  } catch (e) {
	// So here we caught an error, let's update our categories state...
	yield put(categoriesError(e));

	// ... and redirect user to SignIn in case of auth problems
	if (isUnauthorizedError(e)) {
	  yield call(Actions.SignIn);
	}
  }
}

export function* watchCategoriesRequest() {
  yield takeLatest(requestCategories.getType(), fetchCategories);
}
```

That's it! So to conclude, in order to implement Basic Authorization we need:
1. Implement UI for gracefully handle authorization errors (Sign In form in our case).
2. Make sure that you're able to store user actions history if you need to retry after user is signed in (not covered here, but consider it as more sophisticated reducer).
3. Combine all previous steps with meaningfull scenario (saga is doing it for us).
4. Last but not least: test all the things! ([sagas](https://github.com/jetthoughts/FreemarketRn/tree/master/app/sagas/__tests__), [reducers](https://github.com/jetthoughts/FreemarketRn/tree/master/app/reducers/__tests__), [components](https://github.com/jetthoughts/FreemarketRn/tree/master/app/components/__tests__). _placeholder for links to our unit testing articles/screencasts._
