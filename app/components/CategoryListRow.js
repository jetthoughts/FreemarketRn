import React, { PropTypes } from 'react';
import { TouchableHighlight, Text } from 'react-native';

const CategoryListRow = ({ onPress, name }) => (
  <TouchableHighlight onPress={onPress} >
    <Text>{name}</Text>
  </TouchableHighlight>
);

CategoryListRow.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CategoryListRow;