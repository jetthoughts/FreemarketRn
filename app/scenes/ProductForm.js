import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ProductFormView from '../components/ProductFormView';
import { requestCreateProduct } from '../reducers/products';
import { categoriesToObject } from '../utils/records';
import { requestCategories } from '../reducers/categories';

const mapStateToProps = state => ({
  categories: categoriesToObject(state.categories.list.records),
});

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(requestCategories()),
  onPress: payload => dispatch(requestCreateProduct(payload)),
  onBackPress: Actions.ProductIndex,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductFormView);
