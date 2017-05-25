import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Button, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';

import FormImagePicker from './FormImagePicker';
import { dateToTimeString } from '../lib/helpers'
import MaskedInputTemplate from '../lib/form_templates/MaskedInputTemplate';
import LocalImageFactory from '../lib/form_factories/LocalImageFactory.js';

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

const ImageFlag = t.refinement(t.Bool, value => value);

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

// const LocalImage = t.refinement(t.Struct({
//   // data: t.String,
//   // fileName: t.String,
//   // fileSize: t.Integer,
//   // height: t.Integer,
//   // isVertical: t.Bool,
//   // originalRotation: t.Integer,
//   // path: t.String,
//   // type: t.String,
//   uri: t.String,
//   // width: t.Integer,
// }), (localImageStruct) => {
//   return localImageStruct;
// });

const LocalImage = t.struct({
  data: t.String,
  fileName: t.String,
  fileSize: t.Integer,
  height: t.Integer,
  isVertical: t.Bool,
  originalRotation: t.Integer,
  path: t.String,
  type: t.String,
  uri: t.String,
  width: t.Integer,
});

const productOptions = {
  image: LocalImage,
  // imageFlag: ImageFlag,
  name: Name,
  // description: t.maybe(t.String),
  // category: t.enums({'-1': 'Loading...'}),
  price: Positive,
  // allowPhone: t.Bool,
  // phone: t.String,
  // endTime: t.Date,
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
    imageFlag: {
      // hidden: true,
      error: 'Please, add an image'
    },
    name: {
      maxLength: 10,
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
      error: 'Please, give a positive number',
      // template: MaskedInputTemplate,
      // config: {
      //   mask: 'money',
      // }
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
      productOptions: productOptions,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.categories != this.props.categories) {
  //     const newProductOptions = t.update(this.state.productOptions, {
  //       category: { '$set': t.enums(nextProps.categories) }
  //     });
  //     this.setState({
  //       productOptions: newProductOptions,
  //     });
  //   }
  // }

  onFormPress() {
    let product = this.form.getValue();
    // a = this.form.getComponent('imageFlag').refs;
    const { localImage } = product.image;
    // delete product.image;
    this.props.onPress({ product, localImage: product.image });
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
      formValue: { ...this.state.formValue, imageFlag: true },
    });
  }

  render() {
    return (
      <ScrollView style={styles.formView}>
        {/*<FormImagePicker
          imageSource={this.state.imageSource}
          setLocalImage={localImage => this.setLocalImage(localImage)}
        />*/}
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
