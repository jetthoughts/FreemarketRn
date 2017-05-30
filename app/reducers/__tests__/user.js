import reducer, {
  requestSignIn,
  signInSuccess,
  signInFailure,
} from '../user';

describe('initial state', () => {
  it('is completed', () => {
    const user = reducer();

    expect(user.completed).toBeTruthy();
  });

  it('has empty record', () => {
    const user = reducer();

    expect(user.record).toEqual({});
  });

  it('has no error', () => {
    const user = reducer();

    expect(user.error).toBeNull();
  });
});

it('is not completed on request', () => {
  const user = reducer(undefined, requestSignIn());

  expect(user.completed).toBeFalsy();
});

it('is replaces record on success', () => {
  const user = reducer(undefined, signInSuccess({ name: 'MyName' }));

  expect(user.record.name).toBe('MyName');
});

it('is completed on success', () => {
  const user = reducer(undefined, signInSuccess());

  expect(user.completed).toBeTruthy();
});

it('it sets error on failure', () => {
  const user = reducer(undefined, signInFailure({ status: 500 }));

  expect(user.error.status).toBe(500);
});

it('is completed on failure', () => {
  const user = reducer(undefined, signInFailure());

  expect(user.completed).toBeTruthy();
});
