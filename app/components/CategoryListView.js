import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import CategoryListItem from '../containers/CategoryListItem';

export default class CategoryListView extends Component {
  constructor(props) {
    super(props);

    props.loadCategories();

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    });
    this.dataSource = ds.cloneWithRows([]);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.categories.length !== this.props.categories.length ||
      nextProps.categories.map(cat => cat.id) !== this.props.categories.map(cat => cat.id);
  }

  componentWillUpdate(nextProps) {
    this.dataSource = this.dataSource.cloneWithRows(nextProps.categories);
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={row => <CategoryListItem id={row.id} name={row.name} />}
      />
    );
  }
}

CategoryListView.propTypes = {
  loadCategories: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
