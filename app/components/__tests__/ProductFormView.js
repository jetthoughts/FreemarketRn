import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MockDate from 'mockdate';

import ProductFormView from '../ProductFormView';
import categories from '../../constants/categories';
import { categoriesToObject } from '../../lib/helpers';

it('renders successfully', () => {
  MockDate.set('Wed Feb 02 2000 00:00:00', 120);

  const tree = renderer.create(
    <ProductFormView
      categories={categoriesToObject(categories)}
      onPress={() => true}
      onBackPress={() => true}
      loadCategories={() => true}
    />,
  ).toJSON();

  expect(tree).toMatchSnapshot();

  MockDate.reset();
});
