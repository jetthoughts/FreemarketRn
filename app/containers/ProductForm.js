import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native';

import ProductFormView from '../components/ProductFormView';
import { requestCreateProduct } from '../reducers/products';

const mapStateToProps = state => ({
  categories: {
  '0': 'Antiques',
  '1': 'Books, Comics & Magazines',
  '2': 'Cars, Motorcycles & Vehicles',
  '3': 'Events Tickets',
  '4': 'Pet Supplies',
},
});

const mapDispatchToProps = dispatch => ({
  onPress: (payload) => {
    Keyboard.dismiss();
    if (payload.product) {
      dispatch(requestCreateProduct(payload));
    }
  },
  onBackPress: Actions.ProductIndex,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductFormView);
