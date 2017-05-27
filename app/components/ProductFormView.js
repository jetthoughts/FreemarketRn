import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Button, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';

import { dateToTimeString } from '../lib/helpers'
import MaskedInputTemplate from '../lib/tcomb-form/templates/MaskedInputTemplate';
import LocalImageFactory from '../lib/tcomb-form/factories/LocalImageFactory';
import LocalImage from '../lib/tcomb-form/types/localImage';

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

Positive.getValidationErrorMessage = (value, path, context) => {
  if (value > 100) {
    return "Too expensive, nobody gonna buy it";
  } else {
    return 'Please, give a positive number';
  }
}

const productOptions = {
  image: LocalImage,
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
    image: {
      factory: LocalImageFactory,
      error: 'Please, add an image',
    },
    name: {
      maxLength: 10,
      error: 'Please, add some name',
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
    },
    phone: {
      editable: false,
      template: MaskedInputTemplate,
      config: {
        mask: 'cel-phone',
      }
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

    props.loadCategories();

    const newProductOptions = t.update(productOptions, {
      category: { '$set': t.enums(props.categories) }
    });
    
    this.state = {
      imageSrouce: null,
      localImage: null,
      formOptions: formOptions,
      formValue: {
        name: 'Misha',
      },
      productOptions: newProductOptions,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.categories != this.props.categories) {
      const newProductOptions = t.update(this.state.productOptions, {
        category: { '$set': t.enums(nextProps.categories) }
      });
      this.setState({
        productOptions: newProductOptions,
      });
    }
  }

  onFormPress() {
    const product = this.form.getValue();
    this.props.onPress({ product });
  }

  onFormChange(value) {
    const allowPhone = !!value.allowPhone;
    const options = t.update(this.state.formOptions, {
      fields: {
        phone: {
          editable: {'$set': allowPhone},
        }
      }
    });
    const newProductOptions = t.update(this.state.productOptions, {
      phone: {
        '$set': (allowPhone ? t.String : t.maybe(t.String)),
      },
    })
    this.setState({
      formOptions: options, 
      formValue: value, 
      productOptions: newProductOptions
    });
  }

  render() {
    return (
      <ScrollView style={styles.formView}>
        <Form
          ref={_form => (this.form = _form)}
          type={t.struct(this.state.productOptions)}
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
