import React from 'react';
import { AppRegistry } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import App from './app/App';
import Main from './app/screens/Main.android';
import ProductForm from './app/containers/ProductForm';

const FreemarketRn = () => (
  <App>
    <Router>
      <Scene key="ProductIndex" component={Main} hideNavBar />
      <Scene key="ProductForm" component={ProductForm} hideNavBar initial />
    </Router>
  </App>
);
export default FreemarketRn;

AppRegistry.registerComponent('FreemarketRn', () => FreemarketRn);
