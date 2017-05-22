import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Button, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';

import FormImagePicker from './FormImagePicker';

const styles = StyleSheet.create({
  formView: {
    padding: 10,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

const Form = t.form.Form;

const Name = t.String;

Name.getValidationErrorMessage = (value, path, context) => {
  if (!value) {
    return "Please, add some name";
  } else {
    return '';
  }
}

const Positive = t.refinement(t.Number, function (n) {
  return n >= 0 && n <= 100;
});

const Product = t.struct({
  name: Name,
  description: t.maybe(t.String),
  price: Positive,
  endTime: t.Date,
});

const formOptions = {
  i18n: {
    optional: '',
    required: ' *',
  },
  fields: {
    name: {
      maxLength: 4,
    },
    description: {
      multiline: true,
      numberOfLines: 4,
    },
    price: {
      help: 'Pro tip: better to set affordable price',
      error: 'Please, give a positive number'
    },
  },
};

export default class ProductFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrouce: null,
      localImage: null,
    };
  }

  onFormPress() {
    const product = this.form.getValue();
    const { localImage } = this.state;
    this.props.onPress({ product, localImage });
  }

  setLocalImage(localImage) {
    this.setState({
      imageSource: localImage.uri,
      localImage,
    });
  }

  render() {
    return (
      <ScrollView style={styles.formView}>
        <FormImagePicker
          imageSource={this.state.imageSource}
          setLocalImage={localImage => this.setLocalImage(localImage)}
        />
        <Form
          ref={_form => (this.form = _form)}
          type={Product}
          options={formOptions}
        />
        <View style={styles.button}>
          <Button
            onPress={() => this.onFormPress()}
            title="Add Product"
          />
        </View>
        <View style={styles.button}>
          <Button
            style={styles.button}
            onPress={() => this.props.onBackPress()}
            color="red"
            title="Back"
          />
        </View>
      </ScrollView>
    );
  }
}

ProductFormView.propTypes = {
  onPress: PropTypes.func.isRequired,
  onBackPress: PropTypes.func.isRequired,
};
