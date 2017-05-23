import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Button, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';

import FormImagePicker from './FormImagePicker';
import { dateToTimeString } from '../lib/helpers'

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

const productOptions = {
  name: Name,
  description: t.maybe(t.String),
  category: t.enums({'-1': 'Loading...'}),
  price: Positive,
  allowPhone: t.Bool,
  phone: t.String,
  endTime: t.Date,
};

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
    category: {
      nullOption: {
        value: '', 
        text: '< Choose Category >',
      },
    },
    price: {
      help: 'Pro tip: better to set affordable price',
      error: 'Please, give a positive number'
    },
    phone: {
      editable: false,
    },
    endTime: {
      mode: 'time',
      config: {
        format: dateToTimeString,
      },
    },
  },
};

export default class ProductFormView extends Component {
  constructor(props) {
    super(props);

    const newProductOptions = t.update(productOptions, {
      category: { '$set': t.enums(props.categories) }
    });
    
    this.state = {
      imageSrouce: null,
      localImage: null,
      formOptions: formOptions,
      formValue: null,
      Product: t.struct(newProductOptions),
    };
  }

  onFormPress() {
    const product = this.form.getValue();
    const { localImage } = this.state;
    this.props.onPress({ product, localImage });
  }

  onFormChange(value) {
    const options = t.update(this.state.formOptions, {
      fields: {
        phone: {
          editable: {'$set': value.allowPhone},
        }
      }
    });
    this.setState({formOptions: options, formValue: value});
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
          type={this.state.Product}
          options={this.state.formOptions}
          value={this.state.formValue}
          onChange={(value) => this.onFormChange(value)}
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
