import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import ProductListView from '../ProductListView';

it('renders correctly', () => {
  const category = { id: 0, name: 'Home Decor' };
  const tree = renderer.create(<ProductListView category={category} />).toJSON();

  expect(tree).toMatchSnapshot();
});
