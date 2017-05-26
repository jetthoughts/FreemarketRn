import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native';

import ProductFormView from '../components/ProductFormView';
import { requestCreateProduct } from '../reducers/products';
import categories from '../constants/categories';
import { categoriesToObject } from '../lib/helpers';
import { requestCategories } from '../reducers/categories';

const mapStateToProps = state => ({
  categories: categoriesToObject(state.categories.list.records),
});

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(requestCategories()),
  onPress: (payload) => {
    Keyboard.dismiss();
    if (payload.product) {
      const { product } = payload;
      const localImage = product.image;
      dispatch(requestCreateProduct({ product, localImage}));
    }
  },
  onBackPress: Actions.ProductIndex,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductFormView);
