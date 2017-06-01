import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MockDate from 'mockdate';

import ProductFormView from '../ProductFormView';
import categories from '../../constants/categories';
import { categoriesToObject } from '../../utils/records';

it('renders successfully', () => {
  MockDate.set(949442400000);

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
