import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import SignInForm from '../SignInForm';

it('renders successfully', () => {
  const tree = renderer.create(
    <SignInForm
      onSubmit={() => true}
    />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
